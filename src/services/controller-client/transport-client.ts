import { AppState, type AppStateStatus } from 'react-native'

import { messages } from './constants'
import { Deferred } from './deferred'

export enum CloseReason {
  MANUAL = 'MANUAL',
  APP_BACKGROUND = 'APP_BACKGROUND',
  CONNECTION_LOST = 'CONNECTION_LOST',
}

export type TransportEvent =
  | { type: WebSocket['CONNECTING'] }
  | { type: WebSocket['OPEN'] }
  | { type: WebSocket['CLOSED']; reason: CloseReason }

type TransportEventListener = (event: TransportEvent) => void

export class TransportClient {
  private serverIp: string
  private socket: WebSocket | null = null
  private pendingResponse?: Deferred<string>
  private closeReason?: CloseReason

  private readonly listeners = new Set<TransportEventListener>()

  constructor(ip: string) {
    this.serverIp = ip
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  private get isConnected() {
    return this.socket?.readyState === WebSocket.OPEN
  }

  private readonly handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      if (this.closeReason === CloseReason.APP_BACKGROUND) {
        this.open()
      }

      return
    }

    this.close(CloseReason.APP_BACKGROUND)
  }

  private emit(event: TransportEvent) {
    this.listeners.forEach((listener) => {
      listener(event)
    })
  }

  subscribe(listener: TransportEventListener) {
    this.listeners.add(listener)

    return () => {
      this.listeners.delete(listener)
    }
  }

  open() {
    if (this.isConnected) return

    const serverIp = this.serverIp
    const socket = new WebSocket(`ws://${serverIp}`)

    this.socket = socket

    this.emit({ type: WebSocket.CONNECTING })

    const isCurrentSocket = () => this.socket === socket

    socket.onopen = () => {
      if (!isCurrentSocket()) return

      console.info(messages.info.connected, { ip: serverIp })

      this.emit({ type: WebSocket.OPEN })
    }

    socket.onclose = () => {
      if (!isCurrentSocket()) return

      console.info(messages.info.disconnected, { ip: serverIp })

      this.socket = null

      const error = new Error(messages.error.connectionFailed)

      this.pendingResponse?.reject(error)

      const reason = this.closeReason ?? CloseReason.CONNECTION_LOST

      this.emit({ type: WebSocket.CLOSED, reason })
    }

    socket.onerror = () => {
      if (!isCurrentSocket()) return

      const error = new Error(`${messages.error.connectionFailed}: ${serverIp}`)

      this.pendingResponse?.reject(error)

      this.closeReason = CloseReason.CONNECTION_LOST
    }

    socket.onmessage = (event) => {
      if (!isCurrentSocket() || !this.pendingResponse) return

      this.pendingResponse.resolve(String(event.data))
    }
  }

  close(reason = CloseReason.MANUAL) {
    const socket = this.socket

    if (!socket) {
      return
    }

    this.socket = null
    this.closeReason = reason

    const error = new Error(messages.error.connectionLost)

    this.pendingResponse?.reject(error)

    this.emit({ type: WebSocket.CLOSED, reason })

    socket?.close()
  }

  send(message: string) {
    if (!this.isConnected || !this.socket) {
      throw new Error(messages.error.noConnection)
    }
    console.info(message, { ip: this.serverIp })
    this.socket.send(message)
  }

  request(message: string, timeoutMs = 30_000): Promise<string> {
    if (!this.isConnected || !this.socket) {
      return Promise.reject(new Error(messages.error.noConnection))
    }

    if (this.pendingResponse) {
      return Promise.reject(new Error(messages.error.requestInProgress))
    }

    let timeout: ReturnType<typeof setTimeout>

    const pendingResponse = new Deferred<string>(() => {
      clearTimeout(timeout)
      this.pendingResponse = undefined
    })

    timeout = setTimeout(() => {
      pendingResponse.reject(new Error(messages.error.timeout))
    }, timeoutMs)

    this.pendingResponse = pendingResponse

    this.socket.send(message)

    return pendingResponse.promise
  }

  changeIP(newIp: string) {
    this.serverIp = newIp
  }
}

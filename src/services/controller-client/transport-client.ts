import { AppState, type AppStateStatus } from 'react-native'

import { messages } from './constants'
import { Deferred } from './deferred'

export type TransportEvent =
  | WebSocket['CONNECTING']
  | WebSocket['OPEN']
  | WebSocket['CLOSED']
type TransportEventListener = (event: TransportEvent) => void

export class TransportClient {
  private serverIp: string
  private socket: WebSocket | null = null
  private pendingResponse?: Deferred<string>
  private pendingConnection?: Deferred<void>

  private readonly listeners = new Set<TransportEventListener>()

  constructor(ip: string) {
    this.serverIp = ip
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  private get isConnected() {
    return this.socket?.readyState === WebSocket.OPEN
  }

  private readonly handleAppStateChange = async (
    nextAppState: AppStateStatus,
  ) => {
    if (nextAppState === 'active') {
      try {
        await this.open()
      } catch (error) {
        console.error(error)
      }

      return
    }

    this.close()
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

  open(): Promise<void> {
    if (this.isConnected) {
      return Promise.resolve()
    }

    if (this.pendingConnection) {
      return this.pendingConnection.promise
    }

    const serverIp = this.serverIp
    const socket = new WebSocket(`ws://${serverIp}`)

    this.socket = socket

    const pendingConnection = new Deferred<void>(() => {
      this.pendingConnection = undefined
    })

    this.pendingConnection = pendingConnection

    this.emit(WebSocket.CONNECTING)

    const isCurrentSocket = () => this.socket === socket

    socket.onopen = () => {
      if (!isCurrentSocket()) return

      console.info(messages.info.connected, { ip: serverIp })

      pendingConnection.resolve()
      this.emit(WebSocket.OPEN)
    }

    socket.onclose = () => {
      if (!isCurrentSocket()) return

      console.info(messages.info.disconnected, { ip: serverIp })

      this.socket = null

      const error = new Error(messages.error.connectionFailed)

      this.pendingResponse?.reject(error)
      pendingConnection.reject(error)

      this.emit(WebSocket.CLOSED)
    }

    socket.onerror = () => {
      if (!isCurrentSocket()) return

      const error = new Error(`${messages.error.connectionFailed}: ${serverIp}`)

      this.pendingResponse?.reject(error)
      pendingConnection.reject(error)
    }

    socket.onmessage = (event) => {
      if (!isCurrentSocket() || !this.pendingResponse) return

      this.pendingResponse.resolve(String(event.data))
    }

    return pendingConnection.promise
  }

  close(code?: number, reason?: string) {
    const socket = this.socket

    if (!socket) {
      return
    }

    this.socket = null

    const error = new Error(messages.error.connectionLost)

    this.pendingResponse?.reject(error)
    this.pendingConnection?.reject(error)

    this.emit(WebSocket.CLOSED)

    socket?.close(code, reason)
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

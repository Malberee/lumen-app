import { AppState, type AppStateStatus } from 'react-native'

import { messages } from './constants'

interface PendingResponse {
  resolve: (message: string) => void
  reject: (error: Error) => void
  timeout: ReturnType<typeof setTimeout>
}

export class TransportClient {
  private serverIp: string
  private socket: WebSocket | null = null
  private pendingResponse?: PendingResponse
  private connectPromise?: Promise<void>

  constructor(ip: string) {
    this.serverIp = ip
    AppState.addEventListener('change', this.handleAppStateChange)
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

  private rejectPendingResponse(error: Error) {
    if (!this.pendingResponse) {
      return
    }

    clearTimeout(this.pendingResponse.timeout)
    this.pendingResponse.reject(error)
    this.pendingResponse = undefined
  }

  get isConnected() {
    return this.socket?.readyState === WebSocket.OPEN
  }

  open(): Promise<void> {
    if (this.isConnected) {
      return Promise.resolve()
    }

    if (this.connectPromise) {
      return this.connectPromise
    }

    const serverIp = this.serverIp
    const socket = new WebSocket(`ws://${serverIp}`)

    this.socket = socket

    this.connectPromise = new Promise((resolve, reject) => {
      socket.onopen = () => {
        console.info(messages.info.connected, { ip: serverIp })
        this.connectPromise = undefined
        resolve()
      }

      socket.onclose = () => {
        console.info(messages.info.disconnected, { ip: serverIp })

        if (this.socket === socket) {
          this.socket = null
        }

        this.connectPromise = undefined

        this.rejectPendingResponse(new Error(messages.error.connectionLost))
      }

      socket.onerror = () => {
        const error = new Error(
          `${messages.error.connectionFailed}: ${serverIp}`,
        )

        this.connectPromise = undefined

        this.rejectPendingResponse(error)

        reject(error)
      }

      socket.onmessage = (event) => {
        if (!this.pendingResponse) {
          return
        }

        clearTimeout(this.pendingResponse.timeout)
        this.pendingResponse.resolve(String(event.data))
        this.pendingResponse = undefined
      }
    })

    return this.connectPromise
  }

  close(code?: number, reason?: string) {
    const socket = this.socket

    this.connectPromise = undefined

    if (socket) {
      socket.close(code, reason)
    }

    this.rejectPendingResponse(new Error(messages.error.connectionLost))
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

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pendingResponse = undefined
        reject(new Error(messages.error.timeout))
      }, timeoutMs)

      this.pendingResponse = {
        resolve,
        reject,
        timeout,
      }

      this.socket!.send(message)
    })
  }

  changeIP(newIp: string) {
    this.serverIp = newIp
  }
}

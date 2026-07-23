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

  constructor(ip: string) {
    this.serverIp = ip
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  private async handleAppStateChange(nextAppState: AppStateStatus) {
    if (nextAppState === 'active') {
      await this.open()
    } else {
      this.close()
    }
  }

  get isConnected() {
    return this.socket?.readyState === WebSocket.OPEN
  }

  open(): Promise<void> {
    if (this.isConnected) {
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      const serverIp = this.serverIp
      const socket = new WebSocket(`ws://${serverIp}`)

      socket.onopen = () => {
        console.info(messages.info.connected, { ip: serverIp })
        this.socket = socket
        resolve()
      }

      socket.onclose = () => {
        if (this.socket === socket) {
          console.info(messages.info.disconnected, { ip: serverIp })
          this.socket = null
        }
      }

      socket.onerror = () => {
        const error = new Error(
          `${messages.error.connectionFailed}: ${serverIp}`,
        )

        if (this.pendingResponse) {
          clearTimeout(this.pendingResponse.timeout)
          this.pendingResponse.reject(error)
          this.pendingResponse = undefined
        }

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
  }

  close(code?: number, reason?: string) {
    if (this.socket) {
      const socket = this.socket
      this.socket = null
      socket.close(code, reason)
    }
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

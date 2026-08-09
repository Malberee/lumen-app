import { type ModeType } from '@constants'

import { commandHeaders, DEFAULT_CONTROLLER_IP } from './constants'
import { serializeMode, serializeParams } from './helpers'
import { TransportClient, type TransportEvent } from './transport-client'
import { isIPAddress } from './utils'

export enum ConnectionStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
}

type ConnectionStatusListener = (status: ConnectionStatus) => void

export class ControllerClient {
  private readonly transport = new TransportClient(DEFAULT_CONTROLLER_IP)
  private connectionStatus = ConnectionStatus.DISCONNECTED

  private readonly statusListeners = new Set<ConnectionStatusListener>()

  constructor() {
    this.transport.subscribe(this.handleTransportEvent)
  }

  private readonly setConnectionStatus = (status: ConnectionStatus) => {
    if (this.connectionStatus === status) return

    this.connectionStatus = status

    this.statusListeners.forEach((listener) => listener(status))
  }

  private readonly handleTransportEvent = (event: TransportEvent) => {
    switch (event) {
      case WebSocket.CONNECTING:
        this.setConnectionStatus(ConnectionStatus.CONNECTING)
        break

      case WebSocket.OPEN:
        this.setConnectionStatus(ConnectionStatus.CONNECTED)
        break

      case WebSocket.CLOSED:
        this.setConnectionStatus(ConnectionStatus.DISCONNECTED)
        break

      default:
        break
    }
  }

  subscribeToConnectionState = (listener: ConnectionStatusListener) => {
    this.statusListeners.add(listener)

    return () => {
      this.statusListeners.delete(listener)
    }
  }
  getConnectionStatus = () => {
    return this.connectionStatus
  }

  async connect() {
    await this.transport.open()
    this.transport.send(commandHeaders.connect)
  }
  disconnect() {
    this.transport.send(commandHeaders.disconnect)
    this.transport.changeIP(DEFAULT_CONTROLLER_IP)
    this.transport.close()
  }

  setMode(mode: ModeType) {
    const serializedMode = serializeMode(mode)
    this.transport.send(`${commandHeaders.mode} ${serializedMode}`)
  }
  setPower(power: boolean) {
    this.transport.send(
      power ? commandHeaders.powerOn : commandHeaders.powerOff,
    )
  }

  async connectToWiFi(ssid: string, pass: string) {
    const serializedParams = serializeParams({ ssid, pass })

    const response = await this.transport.request(
      `${commandHeaders.credentials} ${serializedParams}`,
    )

    if (!isIPAddress(response)) {
      throw new Error(response)
    }

    this.transport.close()
    this.transport.changeIP(response)
  }
}

import { type ModeType } from '@constants'

import { commandHeaders, DEFAULT_CONTROLLER_IP } from './constants'
import { serializeMode, serializeParams } from './helpers'
import {
  CloseReason,
  TransportClient,
  type TransportEvent,
} from './transport-client'
import { isIPAddress } from './utils'

export enum ConnectionStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
}

type ConnectionState =
  | {
      status: ConnectionStatus.CONNECTING
    }
  | {
      status: ConnectionStatus.CONNECTED
    }
  | {
      status: ConnectionStatus.DISCONNECTED
      reason: CloseReason
    }
type ConnectionStateListener = (status: ConnectionState) => void

export class ControllerClient {
  private readonly transport = new TransportClient(DEFAULT_CONTROLLER_IP)
  private connectionState: ConnectionState = {
    status: ConnectionStatus.DISCONNECTED,
    reason: CloseReason.MANUAL,
  }

  private readonly statusListeners = new Set<ConnectionStateListener>()

  constructor() {
    this.transport.subscribe(this.handleTransportEvent)
  }

  private readonly setConnectionState = (state: ConnectionState) => {
    if (this.connectionState.status === state.status) return

    this.connectionState = state

    this.statusListeners.forEach((listener) => listener(state))
  }

  private readonly handleTransportEvent = (event: TransportEvent) => {
    switch (event.type) {
      case WebSocket.CONNECTING:
        this.setConnectionState({ status: ConnectionStatus.CONNECTING })
        break

      case WebSocket.OPEN:
        this.setConnectionState({ status: ConnectionStatus.CONNECTED })
        break

      case WebSocket.CLOSED:
        this.setConnectionState({
          status: ConnectionStatus.DISCONNECTED,
          reason: event.reason,
        })
        break

      default:
        break
    }
  }

  subscribeToConnectionState = (listener: ConnectionStateListener) => {
    this.statusListeners.add(listener)

    return () => {
      this.statusListeners.delete(listener)
    }
  }
  getConnectionState = () => {
    return this.connectionState
  }

  connect() {
    if (this.getConnectionState().status === ConnectionStatus.CONNECTED) return

    const unsubscribe = this.subscribeToConnectionState(({ status }) => {
      if (status === ConnectionStatus.CONNECTED) {
        unsubscribe()
        this.transport.send(commandHeaders.connect)
      } else if (status === ConnectionStatus.DISCONNECTED) {
        unsubscribe()
      }
    })

    this.transport.open()
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

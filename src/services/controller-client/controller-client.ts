import type { ModeType } from '@store'

import { commandHeaders, DEFAULT_CONTROLLER_IP } from './constants'
import { serializeMode, serializeParams } from './helpers'
import { TransportClient } from './transport-client'
import { isIPAddress } from './utils'

export class ControllerClient {
  private readonly transport = new TransportClient(DEFAULT_CONTROLLER_IP)

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

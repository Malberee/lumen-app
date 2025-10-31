import { useNetInfo } from '@react-native-community/netinfo'
import { useEffect } from 'react'

import { UDP } from '@services'
import { useStore } from '@store'
import { objToString } from '@utils'

import { serializeMode } from './utils'

let skipNext = false

export const useUdpSync = () => {
  const { isConnected, isWifiEnabled } = useNetInfo()

  const sendCurrentMode = async () => {
    const currentMode = useStore.getState().currentMode
    await UDP.sendMessage(`MODE ${serializeMode(currentMode)}`)
  }

  useEffect(() => {
    const init = async () => {
      await UDP.init()
      sendCurrentMode()
    }

    if (isWifiEnabled && isConnected) init()

    const unsubCurrentMode = useStore.subscribe(
      ({ currentMode }) => currentMode.name,
      () => {
        if (!UDP.isInitialized()) return

        skipNext = true

        sendCurrentMode()

        setTimeout(() => {
          skipNext = false
        }, 0)
      },
    )

    const unsubColors = useStore.subscribe(
      ({ currentMode }) => currentMode.colors,
      (colors) => {
        if (skipNext || !UDP.isInitialized()) return

        const data = objToString(colors)
          .replace('primary', 'pri')
          .replace('secondary', 'sec')

        UDP.sendMessage(`MODE ${data}`)
      },
    )

    const unsubSpeed = useStore.subscribe(
      ({ currentMode }) => currentMode.speed,
      (speed) => {
        if (skipNext || !UDP.isInitialized()) return

        UDP.sendMessage(`MODE spd=${speed}`)
      },
    )

    const unsubLength = useStore.subscribe(
      ({ currentMode }) => currentMode.length,
      (length) => {
        if (skipNext || !UDP.isInitialized()) return

        UDP.sendMessage(`MODE lgt=${length}`)
      },
    )

    const unsubPower = useStore.subscribe(
      (state) => state.power,
      (power) => {
        if (skipNext || !UDP.isInitialized()) return

        UDP.sendMessage(power ? 'P_ON' : 'P_OFF')
      },
    )

    return () => {
      unsubCurrentMode()
      unsubColors()
      unsubSpeed()
      unsubLength()
      unsubPower()
      UDP.close()
    }
  }, [isConnected, isWifiEnabled])
}

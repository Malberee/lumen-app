import { useNetInfo } from '@react-native-community/netinfo'
import { useEffect } from 'react'

import { UDP } from '@services'
import { useStore } from '@store'
import { objToString } from '@utils'

import { serializeMode } from './utils'

let skipNext = false

export const useUdpSync = () => {
  const { isConnected } = useNetInfo()

  const sendCurrentMode = async () => {
    const currentMode = useStore.getState().currentMode
    await UDP.sendMessage(`MODE ${serializeMode(currentMode)}`)
  }

  useEffect(() => {
    const setup = async () => {
      await UDP.init()
      await sendCurrentMode()
    }

    if (isConnected) setup()

    const unsubCurrentMode = useStore.subscribe(
      ({ currentMode }) => currentMode.name,
      async () => {
        if (!UDP.isInitialized()) return

        skipNext = true

        await sendCurrentMode()

        setTimeout(() => {
          skipNext = false
        }, 0)
      },
    )

    const unsubColors = useStore.subscribe(
      ({ currentMode }) => currentMode.colors,
      async (colors) => {
        if (skipNext || !UDP.isInitialized()) return

        const data = objToString(colors)
          .replace('primary', 'pri')
          .replace('secondary', 'sec')

        await UDP.sendMessage(`MODE ${data}`)
      },
    )

    const unsubSpeed = useStore.subscribe(
      ({ currentMode }) => currentMode.speed,
      async (speed) => {
        if (skipNext || !UDP.isInitialized()) return

        await UDP.sendMessage(`MODE spd=${speed}`)
      },
    )

    const unsubLength = useStore.subscribe(
      ({ currentMode }) => currentMode.length,
      async (length) => {
        if (skipNext || !UDP.isInitialized()) return

        await UDP.sendMessage(`MODE lgt=${length}`)
      },
    )

    const unsubPower = useStore.subscribe(
      (state) => state.power,
      async (power) => {
        if (skipNext || !UDP.isInitialized()) return

        await UDP.sendMessage(power ? 'P_ON' : 'P_OFF')
      },
    )

    return () => {
      unsubCurrentMode()
      unsubColors()
      unsubSpeed()
      unsubLength()
      unsubPower()

      if (UDP.isInitialized()) UDP.close()
    }
  }, [isConnected])
}

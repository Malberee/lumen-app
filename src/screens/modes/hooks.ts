import { useNetInfo } from '@react-native-community/netinfo'
import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'

import { UDP } from '@services'
import { type ModeType, selectCurrentMode, useStore } from '@store'

import { SPEED_VALUES } from './constants'
import { serializeMode } from './helpers'

export const useUdpSync = () => {
  const { isConnected } = useNetInfo()
  const currentMode = useStore(selectCurrentMode)

  const sendMode = async (mode: ModeType) => {
    const modeObj = { ...mode }

    if (typeof modeObj.speed === 'number') {
      modeObj.speed = SPEED_VALUES[modeObj.speed - 1]
    }

    await UDP.sendMessage(`MODE ${serializeMode(modeObj)}`)
  }

  useEffect(() => {
    const setup = async () => {
      await UDP.init()
      await sendMode(currentMode)
    }

    if (isConnected) setup()

    const unsubCurrentMode = useStore.subscribe(
      (state) => state.modes[state.currentMode],
      async (mode) => {
        if (!UDP.isInitialized()) return

        await sendMode(mode)
      },
      { equalityFn: shallow },
    )

    const unsubPower = useStore.subscribe(
      (state) => state.power,
      async (power) => {
        if (!UDP.isInitialized()) return

        await UDP.sendMessage(power ? 'P_ON' : 'P_OFF')
      },
    )

    return () => {
      unsubCurrentMode()
      unsubPower()
      if (UDP.isInitialized()) UDP.close()
    }
  }, [isConnected])
}

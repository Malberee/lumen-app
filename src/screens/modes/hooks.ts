import { useNetInfo } from '@react-native-community/netinfo'
import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'

import { UDP } from '@services'
import { type ModeType, selectCurrentMode, useStore } from '@store'

import { serializeMode } from './helpers'

export const useUdpSync = () => {
  const { isConnected } = useNetInfo()
  const currentMode = useStore(selectCurrentMode)

  const sendMode = async (mode: ModeType) => {
    await UDP.sendMessage(`MODE ${serializeMode(mode)}`)
  }

  useEffect(() => {
    const setup = async () => {
      await UDP.init()
      await sendMode(currentMode)
    }

    if (isConnected) setup()

    const unsub = useStore.subscribe(
      (state) => state.modes[state.currentMode],
      async (mode) => {
        if (!UDP.isInitialized()) return

        await sendMode(mode)
      },
      { equalityFn: shallow },
    )

    return () => {
      unsub()
      if (UDP.isInitialized()) UDP.close()
    }
  }, [isConnected])
}

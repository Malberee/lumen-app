import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'

import { type ModeType } from '@constants'
import { controllerClient } from '@services'
import { selectCurrentMode, useStore } from '@store'

export const useControllerSync = () => {
  const currentMode = useStore(selectCurrentMode)

  const sendMode = (mode: ModeType) => {
    try {
      controllerClient.setMode(mode)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    sendMode(currentMode)

    const unsubCurrentMode = useStore.subscribe(
      selectCurrentMode,
      (mode) => sendMode(mode),
      { equalityFn: shallow },
    )

    const unsubPower = useStore.subscribe(
      (state) => state.power,
      (power) => controllerClient.setPower(power),
    )

    return () => {
      unsubCurrentMode()
      unsubPower()
    }
  }, [])
}

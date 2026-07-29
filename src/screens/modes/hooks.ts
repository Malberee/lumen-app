import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'

import { controllerClient } from '@services'
import { type ModeType, selectCurrentMode, useStore } from '@store'

import { SPEED_VALUES } from './constants'

export const useControllerSync = () => {
  const currentMode = useStore(selectCurrentMode)

  const sendMode = (mode: ModeType) => {
    const modeObj = { ...mode }

    if (typeof modeObj.speed === 'number') {
      modeObj.speed = SPEED_VALUES[modeObj.speed - 1]
    }

    try {
      controllerClient.setMode(modeObj)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    sendMode(currentMode)

    const unsubCurrentMode = useStore.subscribe(
      (state) => state.modes[state.currentMode],
      async (mode) => {
        sendMode(mode)
      },
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

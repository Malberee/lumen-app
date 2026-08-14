import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'

import { type ModeType } from '@constants'
import { controllerClient } from '@services'
import { selectCurrentMode, useStore } from '@store'

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

import { useEffect } from 'react'
import { useSharedValue } from 'react-native-reanimated'

import {
  selectCurrentMode,
  useModesContext,
  useModesStore,
} from '@entities/mode'

import {
  carousel,
  chroma,
  doubleFill,
  doubleSnake,
  fill,
  rainbow,
  snake,
  staticMode,
} from '../lib'

const modes = {
  carousel,
  snake,
  'double snake': doubleSnake,
  fill,
  'double fill': doubleFill,
  chroma,
  rainbow,
  static: staticMode,
}

export const useLedRing = (ledsCount: number) => {
  const { shouldAnimateLeds } = useModesContext()
  const { name, colors, params } = useModesStore(selectCurrentMode)

  const { length, speed } = params
  const modeName = name as keyof typeof modes

  const leds = useSharedValue<string[]>(
    modes[modeName].initial(ledsCount, colors, length),
  )

  useEffect(() => {
    leds.value = modes[modeName].initial(ledsCount, colors, length)

    if (modeName !== 'static') {
      const interval = setInterval(() => {
        if (shouldAnimateLeds.value) {
          leds.value = modes[modeName].progress(leds.value, colors)
        }
      }, speed)

      return () => clearInterval(interval)
    }
  }, [colors, speed, length, modeName])

  return { leds }
}

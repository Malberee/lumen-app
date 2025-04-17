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
  solid,
} from '../lib'

const modes = {
  carousel,
  snake,
  'double snake': doubleSnake,
  fill,
  'double fill': doubleFill,
  chroma,
  rainbow,
  solid: solid,
}

export const useLedRing = (ledsCount: number) => {
  const { shouldAnimateLeds } = useModesContext()
  const { name, colors, length, speed } = useModesStore(selectCurrentMode)

  const modeName = name as keyof typeof modes

  const leds = useSharedValue<string[]>(
    modes[modeName].initial(ledsCount, colors, length),
  )

  useEffect(() => {
    leds.value = modes[modeName].initial(ledsCount, colors, length)

    if (modeName !== 'solid') {
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

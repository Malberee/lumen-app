import { useEffect } from 'react'
import { useSharedValue } from 'react-native-reanimated'

import {
  selectCurrentMode,
  selectPower,
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
  const power = useModesStore(selectPower)

  const modeName = name as keyof typeof modes

  const leds = useSharedValue<string[]>(
    modes[modeName].initial(ledsCount, colors, length),
  )

  useEffect(() => {
    if (power) {
      leds.value = modes[modeName].initial(ledsCount, colors, length)

      if (modeName !== 'solid') {
        const interval = setInterval(() => {
          if (shouldAnimateLeds.value && power) {
            leds.value = modes[modeName].progress(leds.value, colors)
          }
        }, speed)

        return () => {
          clearInterval(interval)
        }
      }
    } else {
      leds.value = leds.value.map(() => '#000000')
    }
  }, [colors, speed, length, name, power])

  return leds
}

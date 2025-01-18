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
  const { name, colors } = useModesStore(selectCurrentMode)
  const modeName = name as keyof typeof modes

  const leds = useSharedValue<string[]>(
    modes[modeName].initial(ledsCount, colors),
  )

  useEffect(() => {
    leds.value = modes[modeName].initial(ledsCount, colors)

    if (modeName !== 'static') {
      const interval = setInterval(() => {
        if (shouldAnimateLeds.value) {
          leds.value = modes[modeName].progress(leds.value, colors)
        }
      }, 100)

      return () => clearInterval(interval)
    }
  }, [colors])

  return { leds }
}

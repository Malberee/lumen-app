import { colorKit } from 'reanimated-color-picker'

import type { InitialFunction, ProgressFunction } from './index'

const initial: InitialFunction = (ledsCount) => {
  return Array(ledsCount).fill('red')
}

const progress: ProgressFunction = (leds) => {
  const newColor = colorKit.spin(leds[0], '5%').hex()

  return leds.fill(newColor)
}

export const chroma = { initial, progress }

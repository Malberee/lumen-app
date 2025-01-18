import { rotateArray } from '../rotate-array'
import type { InitialFunction, ProgressFunction } from './index'

const initial: InitialFunction = (ledsCount, colors = {}, length = 3) => {
  const [primary, secondary] = Object.values(colors)

  return Array(ledsCount)
    .fill(secondary)
    .fill(primary, 0, length)
    .fill(primary, ledsCount / 2, ledsCount / 2 + length)
}

const progress: ProgressFunction = (leds) => {
  return rotateArray(leds)
}

export const doubleSnake = { initial, progress }

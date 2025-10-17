import { rotateArray } from '../utils'
import type { InitialFunction, ProgressFunction } from './index'

const initial: InitialFunction = (ledsCount, colors = {}, length = 3) => {
  const [primary, secondary] = Object.values(colors)

  return Array(ledsCount).fill(secondary).fill(primary, 0, length)
}

const progress: ProgressFunction = (leds) => {
  return rotateArray(leds)
}

export const snake = { initial, progress }

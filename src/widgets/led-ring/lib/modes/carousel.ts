import { rotateArray } from '../rotate-array'
import type { InitialFunction, ProgressFunction } from './index'

const initial: InitialFunction = (ledsCount, colors = {}) => {
  const [primary, secondary] = Object.values(colors)

  return Array(ledsCount)
    .fill(primary)
    .map((item, index) => (index % 2 === 0 ? secondary : item))
}

const progress: ProgressFunction = (leds) => {
  return rotateArray(leds)
}

export const carousel = { initial, progress }

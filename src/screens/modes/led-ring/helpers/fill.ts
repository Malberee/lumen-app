import { fillArray } from '../utils'
import type { InitialFunction, ProgressFunction } from './index'

let reverse = false

const initial: InitialFunction = (ledsCount, colors = {}) => {
  const [primary, secondary] = Object.values(colors)

  return Array(ledsCount).fill(secondary).fill(primary, 0, 1)
}

const progress: ProgressFunction = (leds, colors = {}) => {
  const [primary, secondary]: string[] = Object.values(colors)

  if (leds.every((led) => led === primary)) {
    reverse = true
  }
  if (leds.every((led) => led === secondary)) {
    reverse = false
  }

  return fillArray(leds, { primary, secondary }, reverse)
}

export const fill = { initial, progress }

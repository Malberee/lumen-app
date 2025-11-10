import { fillArray } from '../utils'
import type { InitialFunction, ProgressFunction } from './index'

let reverse = false

const initial: InitialFunction = (ledsCount, colors = {}) => {
  const [, secondary] = Object.values(colors)

  return Array(ledsCount).fill(secondary)
}

const progress: ProgressFunction = (leds, colors = {}) => {
  const [primary, secondary]: string[] = Object.values(colors)

  if (leds.every((led) => led === primary)) {
    reverse = true
  }
  if (leds.every((led) => led === secondary)) {
    reverse = false
  }

  const firstPart = fillArray(
    leds.slice(0, leds.length / 2),
    { primary, secondary },
    reverse,
  )

  const secondPart = fillArray(
    leds.slice(leds.length / 2).toReversed(),
    { primary, secondary },
    reverse,
  )

  return firstPart.concat(secondPart.toReversed())
}

export const doubleFill = { initial, progress }

import { colorKit } from 'reanimated-color-picker'

import type { InitialFunction, ProgressFunction } from './index'

const initial: InitialFunction = (ledsCount) => {
  return Array(ledsCount)
    .fill('red')
    .map((item, index) => colorKit.spin(item, (360 / ledsCount) * index).hex())
}

const progress: ProgressFunction = (leds) => {
  return leds.map((led) => colorKit.spin(led, '5%').hex())
}

export const rainbow = { initial, progress }

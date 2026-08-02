import { colorKit } from 'reanimated-color-picker'

import { modeSettingKeys, type ModeType } from '@constants'

import { serializeParams } from './serialize-params'

export const serializeMode = (mode: ModeType) => {
  const { colors, ...rest } = mode

  const colorNames = ['pri', 'sec']
  const colorsEntries = Object.fromEntries(
    colors.map((color, index) => {
      const rgbArray = colorKit.RGB(color).array().slice(0, -1)
      return [String(colorNames[index]), rgbArray]
    }),
  )

  return serializeParams({
    ...rest,
    ...colorsEntries,
    name: mode.name.replace(' ', '-'),
  })
    .replace(modeSettingKeys.speed, 'spd')
    .replace(modeSettingKeys.length, 'lgt')
}

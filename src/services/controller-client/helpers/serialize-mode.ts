import type { ModeType } from '@store'

import { serializeParams } from './serialize-params'

export const serializeMode = (mode: ModeType) => {
  const { colors, ...rest } = mode

  const colorNames = ['pri', 'sec']
  const colorsEntries = Object.fromEntries(
    colors.map((color, index) => [`${colorNames[index]}`, color]),
  )

  return serializeParams({
    ...rest,
    ...colorsEntries,
    name: mode.name.replace(' ', '-'),
  })
    .replace('speed', 'spd')
    .replace('length', 'lgt')
}

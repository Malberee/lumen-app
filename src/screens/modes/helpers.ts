import type { ModeType } from '@store'
import { serialize } from '@utils'

export const serializeMode = (mode: ModeType) => {
  const { colors, ...rest } = mode

  const colorNames = ['pri', 'src']
  const colorsEntries = Object.fromEntries(
    colors.map((color, index) => [`${colorNames[index]}`, color]),
  )

  return serialize({
    ...rest,
    ...colorsEntries,
    name: mode.name.replace(' ', '-'),
  })
    .replace('speed', 'spd')
    .replace('length', 'lgt')
}

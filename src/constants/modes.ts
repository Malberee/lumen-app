import type { ModeType } from '@store'

const DEFAULT_LENGTH = 3
const DEFAULT_SPEED = 6

const colors = {
  white: { r: 255, g: 255, b: 255 },
  black: { r: 0, g: 0, b: 0 },
}

export const modes: ModeType[] = [
  {
    name: 'solid',
    colors: [colors.white],
  },
  {
    name: 'fade',
    colors: [colors.white],
    speed: DEFAULT_SPEED,
  },
  {
    name: 'carousel',
    colors: [colors.white, colors.black],
    speed: DEFAULT_SPEED,
  },
  {
    name: 'snake',
    colors: [colors.white, colors.black],
    length: DEFAULT_LENGTH,
    speed: DEFAULT_SPEED,
  },
  {
    name: 'double snake',
    colors: [colors.white, colors.black],
    length: DEFAULT_LENGTH,
    speed: DEFAULT_SPEED,
  },
  {
    name: 'fill',
    colors: [colors.white, colors.black],
    speed: DEFAULT_SPEED,
  },
  {
    name: 'double fill',
    colors: [colors.white, colors.black],
    speed: DEFAULT_SPEED,
  },
  { name: 'chrome', colors: [], speed: DEFAULT_SPEED },
  { name: 'rainbow', colors: [], speed: DEFAULT_SPEED },
]

export type ModeType = {
  name: string
  colors: string[]
  speed?: number
  length?: number
}
export type ModeSetting = keyof typeof modeSettingKeys

const DEFAULT_LENGTH = 3
const DEFAULT_SPEED = 6

const colors = {
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
}

export const modeSettingKeys = {
  speed: 'speed',
  length: 'length',
} as const

export const modes: ModeType[] = [
  {
    name: 'solid',
    colors: [colors.white],
  },
  {
    name: 'breathing',
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
] as const

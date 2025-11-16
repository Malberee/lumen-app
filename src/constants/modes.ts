import type { ModeType } from '@store'

const DEFAULT_LENGTH = 3
const DEFAULT_SPEED = 6

export const modes = [
  {
    name: 'solid',
    colors: { primary: '#ffffff' },
  },
  {
    name: 'carousel',
    colors: { primary: '#ffffff', secondary: '#000000' },
    speed: DEFAULT_SPEED,
  },
  {
    name: 'snake',
    colors: { primary: '#ffffff', secondary: '#000000' },
    length: DEFAULT_LENGTH,
    speed: DEFAULT_SPEED,
  },
  {
    name: 'double snake',
    colors: { primary: '#ffffff', secondary: '#000000' },
    length: DEFAULT_LENGTH,
    speed: DEFAULT_SPEED,
  },
  {
    name: 'fill',
    colors: { primary: '#ffffff', secondary: '#000000' },
    speed: DEFAULT_SPEED,
  },
  {
    name: 'double fill',
    colors: { primary: '#ffffff', secondary: '#000000' },
    speed: DEFAULT_SPEED,
  },
  { name: 'chroma', colors: {}, speed: DEFAULT_SPEED },
  { name: 'rainbow', colors: {}, speed: DEFAULT_SPEED },
] as const satisfies ModeType[]

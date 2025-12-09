import type { ModeType } from '@store'

const DEFAULT_LENGTH = 3
const DEFAULT_SPEED = 6

export const modes: ModeType[] = [
  {
    name: 'solid',
    colors: ['#ffffff'],
  },
  {
    name: 'carousel',
    colors: ['#ffffff', '#000000'],
    speed: DEFAULT_SPEED,
  },
  {
    name: 'snake',
    colors: ['#ffffff', '#000000'],
    length: DEFAULT_LENGTH,
    speed: DEFAULT_SPEED,
  },
  {
    name: 'double snake',
    colors: ['#ffffff', '#000000'],
    length: DEFAULT_LENGTH,
    speed: DEFAULT_SPEED,
  },
  {
    name: 'fill',
    colors: ['#ffffff', '#000000'],
    speed: DEFAULT_SPEED,
  },
  {
    name: 'double fill',
    colors: ['#ffffff', '#000000'],
    speed: DEFAULT_SPEED,
  },
  { name: 'chroma', colors: [], speed: DEFAULT_SPEED },
  { name: 'rainbow', colors: [], speed: DEFAULT_SPEED },
]

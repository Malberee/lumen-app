import type { ModesList } from './model'

export const modes: ModesList = {
  solid: {
    colors: { primary: '#ffffff' },
  },
  carousel: {
    colors: { primary: '#ffffff', secondary: '#000000' },
    speed: 250,
  },
  snake: {
    colors: { primary: '#ffffff', secondary: '#000000' },
    length: 3,
    speed: 250,
  },
  'double snake': {
    colors: { primary: '#ffffff', secondary: '#000000' },
    length: 3,
    speed: 250,
  },
  fill: {
    colors: { primary: '#ffffff', secondary: '#000000' },
    speed: 250,
  },
  'double fill': {
    colors: { primary: '#ffffff', secondary: '#000000' },
    speed: 250,
  },
  chroma: { colors: {}, speed: 250 },
  rainbow: { colors: {}, speed: 250 },
}

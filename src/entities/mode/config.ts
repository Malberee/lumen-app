import type { ModeType } from './model'

export const modes: ModeType[] = [
  {
    name: 'loading',
    colors: { primary: '#ffffff', secondary: '#000000' },
    params: { speed: 250 },
  },
  {
    name: 'snake',
    colors: { primary: '#ffffff', secondary: '#000000' },
    params: { length: 3, speed: 250 },
  },
  {
    name: 'double snake',
    colors: { primary: '#ffffff', secondary: '#000000' },
    params: { length: 3, speed: 250 },
  },
  {
    name: 'fill',
    colors: { primary: '#ffffff', secondary: '#000000' },
    params: { speed: 250 },
  },
  {
    name: 'double fill',
    colors: { primary: '#ffffff', secondary: '#000000' },
    params: { speed: 250 },
  },
  {
    name: 'static',
    colors: { primary: '#ffffff' },
    params: {},
  },
  { name: 'chroma', colors: {}, params: { speed: 250 } },
  { name: 'rainbow', colors: {}, params: { speed: 250 } },
]

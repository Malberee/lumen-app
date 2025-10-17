import { carousel } from './carousel'
import { chroma } from './chroma'
import { doubleFill } from './double-fill'
import { doubleSnake } from './double-snake'
import { fill } from './fill'
import { rainbow } from './rainbow'
import { snake } from './snake'
import { solid } from './solid'

export type InitialFunction = (
  ledsCount: number,
  colors?: Record<string, string>,
  length?: number,
) => string[]
export type ProgressFunction = (
  leds: string[],
  colors?: Record<string, string>,
) => string[]

export const modes = {
  carousel,
  snake,
  'double snake': doubleSnake,
  fill,
  'double fill': doubleFill,
  chroma,
  rainbow,
  solid,
}

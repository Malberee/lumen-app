export * from './snake'
export * from './double-snake'
export * from './carousel'
export * from './fill'
export * from './double-fill'
export * from './chroma'
export * from './rainbow'
export * from './static'

export type InitialFunction = (
  ledsCount: number,
  colors?: Record<string, string>,
  length?: number,
) => string[]
export type ProgressFunction = (
  leds: string[],
  colors?: Record<string, string>,
) => string[]

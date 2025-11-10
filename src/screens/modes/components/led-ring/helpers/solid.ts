import type { InitialFunction } from './index'

const initial: InitialFunction = (ledsCount, colors = {}) => {
  const [primary] = Object.values(colors)

  return Array(ledsCount).fill(primary)
}

export const solid = { initial }

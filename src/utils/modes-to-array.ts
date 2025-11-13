import type { ModeList } from '@store'

export const modesToArray = (modes: ModeList) =>
  Object.entries(modes).map(([key, value]) => ({
    name: key,
    ...value,
  }))

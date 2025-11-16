import type { ModeType } from '@store'
import { serialize } from '@utils'

import { flatObject } from './utils'

export const serializeMode = (mode: ModeType) =>
  serialize(
    flatObject({
      ...mode,
      name: mode.name.replace(' ', '-'),
    }),
  )
    .replace('primary', 'pri')
    .replace('secondary', 'sec')
    .replace('speed', 'spd')
    .replace('length', 'lgt')

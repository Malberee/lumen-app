import type { ModeType } from '@store'
import { objToString } from '@utils'

import { flatObject } from './flat-object'

export const serializeMode = (mode: ModeType) =>
  objToString(
    flatObject({
      ...mode,
      name: mode.name.replace(' ', '-'),
    }),
  )
    .replace('primary', 'pri')
    .replace('secondary', 'sec')

import type { FC } from 'react'

import type { modes } from '@constants'

import {
  BlendIcon,
  FilmIcon,
  LightbulbIcon,
  PaintBucketIcon,
  RainbowIcon,
  SnakeIcon,
  type IconProps,
} from '../icons'

export type ModeName = keyof typeof modes

export const icons: Record<ModeName, FC<IconProps>> = {
  solid: LightbulbIcon,
  carousel: FilmIcon,
  snake: SnakeIcon,
  'double snake': SnakeIcon,
  fill: PaintBucketIcon,
  'double fill': PaintBucketIcon,
  rainbow: RainbowIcon,
  chroma: BlendIcon,
}

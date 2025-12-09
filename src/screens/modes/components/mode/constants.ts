import type { FC } from 'react'

import type { ModeName } from '@store'

import {
  BlendIcon,
  FilmIcon,
  LightbulbIcon,
  PaintBucketIcon,
  RainbowIcon,
  SnakeIcon,
  type IconProps,
} from '../icons'

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

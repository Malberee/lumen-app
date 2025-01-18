import {
  Blur,
  Group,
  RadialGradient,
  Rect,
  vec,
} from '@shopify/react-native-skia'
import type { FC } from 'react'
import {
  type SharedValue,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'
import { colorKit } from 'reanimated-color-picker'

import { brightnessToAlpha } from '../lib'

interface LedProps {
  index: number
  parentWidth: number
  colors: SharedValue<string[]>
}

export const Led: FC<LedProps> = ({ index, parentWidth, colors }) => {
  const ledSize = 16
  const ledsCount = colors.value.length
  const angle = (index / -ledsCount) * 2 * Math.PI
  const radius = parentWidth / 3

  const y = radius * Math.cos(angle) + parentWidth / 2 - ledSize / 2
  const x = radius * Math.sin(angle) + parentWidth / 2 - ledSize / 2

  const color = useSharedValue(brightnessToAlpha(colors.value[index]).hex())

  useAnimatedReaction(
    () => colors.value[index],
    (result) => {
      color.value = brightnessToAlpha(result).hex()
    },
    [colors],
  )

  const gradient = useDerivedValue(() => {
    const start = colorKit.runOnUI().setSaturation(color.value, 0).hex()

    return [start, color.value]
  })

  return (
    <Group
      origin={{ x: x + ledSize / 2, y: y + ledSize / 2 }}
      transform={[{ rotate: (2 * Math.PI * index) / ledsCount }]}
    >
      <Rect color={color} x={x} y={y} width={ledSize} height={ledSize}>
        <Blur blur={10} />
      </Rect>
      <Rect x={x} y={y} width={ledSize} height={ledSize}>
        <RadialGradient
          c={vec(x + ledSize / 2, y + ledSize / 2)}
          r={ledSize / 2}
          colors={gradient}
        />
      </Rect>
    </Group>
  )
}

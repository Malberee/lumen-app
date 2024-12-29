import {
  type SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { colorKit } from 'reanimated-color-picker'

import type { ColorType } from '@entities/mode'

export const usePreview = (
  selectedColor: SharedValue<ColorType>,
  color: SharedValue<string>,
  colorType: ColorType,
) => {
  const textColor = useSharedValue('#ffffff')

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: color.value,
    transform: [
      { scale: withTiming(selectedColor.value === colorType ? 0.95 : 1) },
    ],
  }))

  const textAnimatedStyle = useAnimatedStyle(() => ({
    color: withTiming(textColor.value, { duration: 100 }),
  }))

  useDerivedValue(() => {
    const { r, g, b } = colorKit.runOnUI().RGB(color.value).object()
    const brightness = (r * 299 + g * 587 + b * 114) / 1000

    textColor.value = brightness > 128 ? '#000000' : '#ffffff'
  })

  return { animatedStyle, textAnimatedStyle }
}

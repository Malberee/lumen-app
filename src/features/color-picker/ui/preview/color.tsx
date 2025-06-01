import { cn } from '@malberee/heroui-native'
import type { FC } from 'react'
import { Pressable } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { colorKit } from 'reanimated-color-picker'

import { useColorPicker } from '../../model'

interface ColorProps {
  label: string
  isFirst: boolean
  isLast: boolean
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export const Color: FC<ColorProps> = ({ label, isFirst, isLast }) => {
  const { colors, selectedColor, selectColor } = useColorPicker()

  const isSingleColor = Object.keys(colors.value).length === 1

  const textColor = useSharedValue('#ffffff')
  const backgroundColor = useSharedValue(colors.value[label])
  const scale = useSharedValue(
    isSingleColor ? 1 : selectedColor.value === label ? 0.95 : 1,
  )

  useDerivedValue(() => {
    const { r, g, b } = colorKit.runOnUI().RGB(backgroundColor.value).object()
    const brightness = (r * 299 + g * 587 + b * 114) / 1000

    textColor.value = brightness > 128 ? '#000000' : '#ffffff'
  })

  useDerivedValue(() => {
    backgroundColor.value = colors.value[label]
  })

  useDerivedValue(() => {
    scale.value = withTiming(
      isSingleColor ? 1 : selectedColor.value === label ? 0.95 : 1,
    )
  })

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
    transform: [{ scale: scale.value }],
  }))

  const labelAnimatedStyle = useAnimatedStyle(() => ({
    color: textColor.value,
  }))

  return (
    <AnimatedPressable
      style={animatedStyle}
      className={cn(
        'h-full flex-1 overflow-hidden bg-white',
        isFirst && 'rounded-l-xl',
        isLast && 'rounded-r-lg',
      )}
      onPress={() => selectColor(label)}
    >
      <Animated.Text
        style={labelAnimatedStyle}
        className="absolute bottom-1 right-1 text-lg font-medium capitalize"
      >
        {label}
      </Animated.Text>
    </AnimatedPressable>
  )
}

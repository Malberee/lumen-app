import type { FC } from 'react'
import { Pressable } from 'react-native'
import Animated, { type SharedValue } from 'react-native-reanimated'

import type { ColorType } from '@entities/mode'

import { usePreview } from '../model'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

interface PreviewProps {
  color: SharedValue<string>
  selectedColor: SharedValue<ColorType>
  colorType: ColorType
  onPress: () => void
}

export const Preview: FC<PreviewProps> = ({
  color,
  selectedColor,
  colorType,
  onPress,
}) => {
  const { animatedStyle, textAnimatedStyle } = usePreview(
    selectedColor,
    color,
    colorType,
  )

  return (
    <AnimatedPressable
      style={animatedStyle}
      className={`flex-1 flex-row items-end justify-end overflow-hidden p-1 ${colorType === 'primary' ? 'rounded-l-xl' : 'rounded-r-xl'}`}
      onPress={onPress}
    >
      <Animated.Text
        style={textAnimatedStyle}
        className="text-lg font-medium capitalize"
      >
        {colorType}
      </Animated.Text>
    </AnimatedPressable>
  )
}

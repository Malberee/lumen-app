import type { FC } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated'
import type { RenderThumbProps } from 'reanimated-color-picker'

interface ThumbProps extends RenderThumbProps {
  currentColor: SharedValue<string>
  isDragging: SharedValue<boolean>
}

export const Thumb: FC<ThumbProps> = ({
  width,
  height,
  positionStyle,
  currentColor,
  isDragging,
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(isDragging.value ? 0.8 : 1, { duration: 150 }),
      },
    ],
  }))

  return (
    <Animated.View
      className="rounded-full"
      style={[
        positionStyle,
        {
          width,
          height,
          backgroundColor: currentColor,
        },
      ]}
    >
      <Animated.View
        className="size-4 rounded-full bg-default-50"
        style={animatedStyle}
      />
      <View className="pointer-events-auto absolute z-10 size-11" />
    </Animated.View>
  )
}

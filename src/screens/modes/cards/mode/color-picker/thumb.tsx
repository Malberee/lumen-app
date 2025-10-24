import type { FC } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import type { RenderThumbProps } from 'reanimated-color-picker'

export const Thumb: FC<RenderThumbProps> = ({
  width,
  height,
  positionStyle,
  currentColor,
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: currentColor.value,
  }))

  return (
    <Animated.View style={positionStyle}>
      <Animated.View
        style={[
          {
            width,
            height,
            borderRadius: 9999,
            borderWidth: 2,
            overflow: 'hidden',
          },
          animatedStyle,
        ]}
      >
        <View className="size-full bg-default-50" />
      </Animated.View>
      <View className="pointer-events-auto absolute z-10 size-9" />
    </Animated.View>
  )
}

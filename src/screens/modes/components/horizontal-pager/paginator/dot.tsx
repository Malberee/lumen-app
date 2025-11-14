import { rem } from 'nativewind'
import type { FC } from 'react'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated'

interface DotProps {
  index: number
  scrollX: SharedValue<number>
  pageWidth: number
}

export const Dot: FC<DotProps> = ({ index, scrollX, pageWidth }) => {
  const dotSize = rem.get() / 2

  const animatedStyle = useAnimatedStyle(() => ({
    width: interpolate(
      scrollX.value,
      [(index - 1) * pageWidth, index * pageWidth, (index + 1) * pageWidth],
      [dotSize, dotSize * 2, dotSize],
      Extrapolation.CLAMP,
    ),
    opacity: interpolate(
      scrollX.value,
      [(index - 1) * pageWidth, index * pageWidth, (index + 1) * pageWidth],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    ),
  }))

  return (
    <Animated.View
      key={index}
      className="rounded-full bg-default-100"
      style={[{ height: dotSize }, animatedStyle]}
    />
  )
}

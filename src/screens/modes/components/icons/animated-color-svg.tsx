import { useEffect, type FC } from 'react'
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Svg } from 'react-native-svg'

import type { IconProps } from './types'

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

export const AnimatedColorSvg: FC<IconProps> = ({
  color,
  duration = 300,
  ...props
}) => {
  const rColor = useSharedValue(color)

  const animatedProps = useAnimatedProps(() => ({
    color: withTiming(rColor.value, { duration }),
  }))

  useEffect(() => {
    rColor.value = color
  }, [color])

  return <AnimatedSvg {...props} animatedProps={animatedProps} />
}

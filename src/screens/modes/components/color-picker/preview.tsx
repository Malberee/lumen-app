import { useEffect } from 'react'
import Animated, {
  processColor,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, {
  Defs,
  LinearGradient,
  type LinearGradientProps,
  Path,
} from 'react-native-svg'

import { ANIMATION_DURATION } from './constants'
import { useColorPicker } from './hooks'
import { arrayToObject, generateGradientArray } from './utils'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

export const Preview = () => {
  const { top } = useSafeAreaInsets()
  const { isOpen, currentColors, shouldAnimate, close } = useColorPicker()
  const blur = useSharedValue(0)
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    top: -top,
    transform: [{ scaleY: scale.value }],
    filter: [{ blur: blur.value }],
  }))

  useEffect(() => {
    blur.value = withTiming(isOpen ? 0 : 30)
    scale.value = withTiming(isOpen ? 10 : 1)
  }, [isOpen])

  const rainbow = [
    '#ff0000',
    '#ffff00',
    '#00ff00',
    '#00ffff',
    '#0000ff',
    '#ff00ff',
  ]

  const offsets = rainbow.map(
    (_, index, array) => (1 / (array.length - 1)) * index,
  )

  const gradientColors = useDerivedValue(() => {
    let gradient: string[] = []

    const colors = currentColors.value

    if (colors.length === 0) {
      gradient = rainbow
    } else {
      gradient = generateGradientArray(colors.at(0)!, colors.at(-1)!)
    }

    return withTiming(
      arrayToObject(gradient),
      {
        duration: shouldAnimate.value ? ANIMATION_DURATION : 0,
      },
      () => (shouldAnimate.value = false),
    )
  })

  const animatedProps = useAnimatedProps(() => ({
    gradient: offsets
      .map((offset, index) => [
        offset,
        processColor(gradientColors.value[index]),
      ])
      .flat(),
  }))

  return (
    <Animated.View
      onTouchStart={close}
      className="aboslute -left-4 z-10 w-screen"
      style={animatedStyle}
    >
      <Svg width="100%" height="232" viewBox="0 0 393 232" fill="none">
        <Defs>
          <AnimatedLinearGradient
            id="gradient"
            animatedProps={animatedProps as LinearGradientProps}
          />
        </Defs>
        <Path
          d="M393 198.493C342.513 219.209 273.106 232 196.5 232C119.895 232 50.4874 219.209 0.000183105 198.493C0.000183105 141.302 0 97.8844 0 0H393C393 0 393 130.445 393 198.493Z"
          fill="url(#gradient)"
        />
      </Svg>
    </Animated.View>
  )
}

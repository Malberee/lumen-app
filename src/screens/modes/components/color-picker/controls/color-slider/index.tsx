import { useSlider } from 'merlo-ui'
import { rem } from 'nativewind'
import { type FC, type ReactNode } from 'react'
import { Text, View } from 'react-native'
import { Gesture } from 'react-native-gesture-handler'
import { useDerivedValue, useSharedValue } from 'react-native-reanimated'
import {
  type SliderProps,
  type HSVObject,
  useColorPickerContext,
} from 'reanimated-color-picker'

import AnimatedText from './animated-text'
import { Thumb } from './thumb'

interface ColorSliderProps {
  label: string
  icon: ReactNode
  Slider: FC<SliderProps>
  getValue: (value: HSVObject) => string
  getThumbColor: (color: HSVObject) => string
}

export const ColorSlider: FC<ColorSliderProps> = ({
  label,
  icon,
  Slider,
  getValue,
  getThumbColor,
}) => {
  const { getBaseProps, getLabelWrapperProps, getLabelProps } = useSlider({
    label,
  })
  const { hueValue, saturationValue, brightnessValue } = useColorPickerContext()

  const color = useDerivedValue(() => ({
    h: hueValue.value,
    s: saturationValue.value,
    v: brightnessValue.value,
    a: 100,
  }))
  const value = useDerivedValue(() => getValue(color.value))
  const thumbColor = useDerivedValue(() => getThumbColor(color.value))
  const isDragging = useSharedValue(false)

  const gesture = Gesture.Pan()
    .onBegin(() => (isDragging.value = true))
    .onFinalize(() => (isDragging.value = false))

  return (
    <View {...getBaseProps()}>
      <View {...getLabelWrapperProps()}>
        <View className="flex-row items-center gap-1">
          {icon}
          <Text {...getLabelProps()}>{label}</Text>
        </View>
        <AnimatedText text={value} className="text-white" />
      </View>

      <Slider
        boundedThumb
        thumbSize={(rem.get() / 4) * 5}
        sliderThickness={rem.get() / 4}
        thumbScaleAnimationValue={1}
        renderThumb={(props) => (
          <Thumb {...props} isDragging={isDragging} currentColor={thumbColor} />
        )}
        gestures={[gesture]}
      />
    </View>
  )
}

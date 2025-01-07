import { Button } from '@malberee/nextui-native'
import type { FC } from 'react'
import { View } from 'react-native'
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated'
import ReanimatedColorPicker from 'reanimated-color-picker'

import { useColorPicker } from '../model'
import { Preview } from './preview'
import { Sliders } from './sliders'
import { Thumb } from './thumb'

interface ColorPickerProps {
  onApply: () => void
}

export const ColorPicker: FC<ColorPickerProps> = ({ onApply }) => {
  const { colors, ref, onChange } = useColorPicker()

  return (
    <Animated.View
      entering={ZoomIn.duration(100)}
      exiting={ZoomOut.duration(100)}
      className="absolute left-0 top-0 h-full w-full flex-row items-center justify-center"
    >
      <View
        className="w-[80%] rounded-3xl border border-default-100 bg-default-50 p-4"
        style={{ elevation: 8 }}
      >
        <ReanimatedColorPicker
          ref={ref}
          value={Object.values(colors.value)[0]}
          boundedThumb
          style={{ borderRadius: 9999 }}
          sliderThickness={10.5}
          thumbSize={21}
          thumbScaleAnimationValue={1}
          renderThumb={Thumb}
          onChange={({ hex }) => onChange(hex)}
        >
          <Preview />
          <View className="flex-col gap-6">
            <Sliders />
            <Button size="lg" onPress={onApply}>
              Apply
            </Button>
          </View>
        </ReanimatedColorPicker>
      </View>
    </Animated.View>
  )
}

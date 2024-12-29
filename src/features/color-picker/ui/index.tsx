import { Button } from '@malberee/nextui-native'
import { type FC } from 'react'
import { View } from 'react-native'
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated'
import ReanimatedColorPicker, {
  BrightnessSlider,
  HueSlider,
  SaturationSlider,
} from 'reanimated-color-picker'

import { useColorPicker } from '../model'
import { Preview } from './preview'
import { Thumb } from './thumb'

interface ColorPickerProps {
  onClose: () => void
}

export const ColorPicker: FC<ColorPickerProps> = ({ onClose }) => {
  const { selectedColor, primaryColor, secondaryColor, ref } = useColorPicker()

  return (
    <Animated.View
      entering={ZoomIn.duration(100)}
      exiting={ZoomOut.duration(100)}
      className="absolute left-0 top-0 h-full w-full flex-row items-center justify-center"
    >
      <View
        style={{ elevation: 8 }}
        className="w-[80%] flex-col gap-3 rounded-3xl border border-[#2d2d2f] bg-default-50 p-3"
      >
        <ReanimatedColorPicker
          value="cyan"
          boundedThumb
          thumbShape="circle"
          thumbSize={21}
          style={{ borderRadius: 9999 }}
          thumbScaleAnimationValue={1}
          renderThumb={Thumb}
          sliderThickness={10.5}
          ref={ref}
          onChange={(value) => {
            if (selectedColor.value === 'primary') {
              primaryColor.value = value.hex
            } else {
              secondaryColor.value = value.hex
            }
          }}
        >
          <View className="flex-col gap-4">
            <View className="h-16 flex-row">
              <Preview
                color={primaryColor}
                colorType="primary"
                selectedColor={selectedColor}
                onPress={() => (selectedColor.value = 'primary')}
              />
              <Preview
                color={secondaryColor}
                colorType="secondary"
                selectedColor={selectedColor}
                onPress={() => (selectedColor.value = 'secondary')}
              />
            </View>

            <View className="flex-col gap-6">
              <HueSlider />
              <SaturationSlider />
              <BrightnessSlider />
            </View>

            <Button size="lg" onPress={onClose}>
              Apply
            </Button>
          </View>
        </ReanimatedColorPicker>
      </View>
    </Animated.View>
  )
}

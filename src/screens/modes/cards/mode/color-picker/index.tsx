import { Button } from '@malberee/heroui-native'
import { useRef, type FC } from 'react'
import { Pressable, View } from 'react-native'
import Animated, {
  useSharedValue,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated'
import ReanimatedColorPicker, {
  BrightnessSlider,
  type ColorPickerRef,
  HueSlider,
  SaturationSlider,
} from 'reanimated-color-picker'

import { useModesStore } from '@store'

import { ColorPreview } from './color-preview'
import { Thumb } from './thumb'

interface ColorPickerProps {
  colors: Record<string, string>
  onClose: () => void
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export const ColorPicker: FC<ColorPickerProps> = ({ colors, onClose }) => {
  const colorsList = useSharedValue(colors)
  const selectedColor = useSharedValue(Object.keys(colors)[0])
  const updateColors = useModesStore((state) => state.updateColors)
  const ref = useRef<ColorPickerRef>(null)

  const handleChange = (color: string) => {
    colorsList.value = { ...colorsList.value, [selectedColor.value]: color }
  }

  const handleSelect = (color: string) => {
    if (ref.current === null) return

    ref.current.setColor(colorsList.value[color])
    selectedColor.value = color
  }

  const onApply = () => {
    updateColors(colorsList.value)
    onClose()
  }

  return (
    <AnimatedPressable
      entering={ZoomIn.duration(100)}
      exiting={ZoomOut.duration(100)}
      className="absolute left-0 top-0 h-full w-full flex-row items-center justify-center shadow"
      onPress={onClose}
    >
      <Pressable
        className="w-[80%] rounded-3xl border border-default-100 bg-default-50 p-4"
        style={{ elevation: 8 }}
        onPress={(e) => e.stopPropagation()}
      >
        <ReanimatedColorPicker
          ref={ref}
          value={Object.values(colors)[0]}
          boundedThumb
          style={{ borderRadius: 9999 }}
          sliderThickness={10.5}
          thumbSize={21}
          thumbScaleAnimationValue={1}
          renderThumb={Thumb}
          onChange={({ hex }) => handleChange(hex)}
        >
          <View className="mb-6 h-16 w-full flex-row">
            {Object.keys(colors).map((color, index, array) => (
              <ColorPreview
                key={index}
                colors={colorsList}
                selectedColor={selectedColor}
                label={color}
                isFirst={index === 0}
                isLast={index === array.length - 1}
                onSelect={handleSelect}
              />
            ))}
          </View>

          <View className="flex-col gap-6">
            <HueSlider />
            <SaturationSlider />
            <BrightnessSlider />

            <Button size="lg" onPress={onApply}>
              Apply
            </Button>
          </View>
        </ReanimatedColorPicker>
      </Pressable>
    </AnimatedPressable>
  )
}

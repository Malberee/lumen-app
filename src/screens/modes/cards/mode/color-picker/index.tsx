import { Button } from 'merlo-ui'
import { useRef, type FC } from 'react'
import { Dimensions, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import ReanimatedColorPicker, {
  BrightnessSlider,
  type ColorPickerRef,
  HueSlider,
  SaturationSlider,
} from 'reanimated-color-picker'

import { useStore } from '@store'

import { ColorPreview } from './color-preview'
import { Thumb } from './thumb'

interface ColorPickerProps {
  colors: Record<string, string>
  onApply: () => void
}

export const ColorPicker: FC<ColorPickerProps> = ({ colors, onApply }) => {
  const { width } = Dimensions.get('screen')

  const colorsList = useSharedValue(colors)
  const selectedColor = useSharedValue(Object.keys(colors)[0])
  const updateColors = useStore((state) => state.updateColors)
  const ref = useRef<ColorPickerRef>(null)

  const handleChange = (color: string) => {
    colorsList.value = { ...colorsList.value, [selectedColor.value]: color }
  }

  const handleSelect = (color: string) => {
    if (ref.current === null) return

    ref.current.setColor(colorsList.value[color])
    selectedColor.value = color
  }

  const handleApply = () => {
    updateColors(colorsList.value)
    onApply()
  }

  return (
    <ReanimatedColorPicker
      ref={ref}
      value={Object.values(colors)[0]}
      boundedThumb
      style={{ borderRadius: 9999, width: width * 0.8 }}
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

        <Button size="lg" onPress={handleApply}>
          Apply
        </Button>
      </View>
    </ReanimatedColorPicker>
  )
}

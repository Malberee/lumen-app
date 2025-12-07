import { Button } from 'merlo-ui'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import {
  BrightnessSlider,
  colorKit,
  HueSlider,
  SaturationSlider,
} from 'reanimated-color-picker'

import { BrushIcon, ConstrastIcon, PaletteIcon, SunIcon } from '../../icons'
import { Surface } from '../../surface'
import { ANIMATION_DURATION, DROP_SHADOW } from '../constants'
import { useColorPicker } from '../hooks'
import { ColorSlider } from './color-slider'

export const Controls = () => {
  const { handleApply } = useColorPicker()

  return (
    <Surface
      as={Animated.View}
      className="flex-col gap-2 rounded-3xl"
      style={{ filter: DROP_SHADOW }}
      entering={FadeIn.delay(ANIMATION_DURATION)}
      exiting={FadeOut}
    >
      <ColorSlider
        Slider={HueSlider}
        icon={
          <PaletteIcon width={12} height={12} className="text-foreground" />
        }
        label="HUE"
        getValue={(value) => {
          'worklet'
          return Math.round(value.h) + '°'
        }}
        getThumbColor={(color) => {
          'worklet'
          return colorKit.runOnUI().HEX({
            h: color.h,
            s: 100,
            v: 100,
          })
        }}
      />
      <ColorSlider
        Slider={SaturationSlider}
        label="Saturation"
        icon={<ConstrastIcon className="text-foreground" />}
        getValue={(value) => {
          'worklet'
          return Math.round(value.s) + '%'
        }}
        getThumbColor={(color) => {
          'worklet'
          return colorKit.runOnUI().HEX({
            h: colorKit.runOnUI().getHue(color),
            s: color.s,
            v: 100,
          })
        }}
      />
      <ColorSlider
        Slider={BrightnessSlider}
        label="Brightness"
        icon={<SunIcon className="text-foreground" />}
        getValue={(value) => {
          'worklet'
          return Math.round(value.v) + '%'
        }}
        getThumbColor={(color) => {
          'worklet'
          return colorKit.runOnUI().HEX({
            h: color.h,
            s: 100,
            v: color.v,
          })
        }}
      />

      <Button
        size="lg"
        className="mt-4"
        startContent={<BrushIcon className="text-primary-foreground" />}
        onPress={handleApply}
      >
        Apply
      </Button>
    </Surface>
  )
}

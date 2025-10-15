import React from 'react'
import {
  BrightnessSlider,
  HueSlider,
  SaturationSlider,
} from 'reanimated-color-picker'

export const Sliders = () => {
  return (
    <>
      <HueSlider />
      <SaturationSlider />
      <BrightnessSlider />
    </>
  )
}

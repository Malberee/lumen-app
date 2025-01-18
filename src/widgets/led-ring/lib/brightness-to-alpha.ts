import { colorKit } from 'reanimated-color-picker'
import type { SupportedColorFormats } from 'reanimated-color-picker/lib/typescript/colorKit/types'

export const brightnessToAlpha = (color: SupportedColorFormats) => {
  'worklet'

  const brightness = colorKit.runOnUI().getBrightness(color)

  return colorKit
    .runOnUI()
    .setAlpha(
      colorKit.runOnUI().setBrightness(color, 100).hex(),
      brightness / 100,
    )
}

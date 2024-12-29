import { useRef } from 'react'
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated'
import type { ColorPickerRef } from 'reanimated-color-picker'

export const useColorPicker = () => {
  const selectedColor = useSharedValue<'primary' | 'secondary'>('primary')
  const primaryColor = useSharedValue('#d4e979')
  const secondaryColor = useSharedValue('#e979bc')

  const ref = useRef<ColorPickerRef>(null)

  useAnimatedReaction(
    () => selectedColor.value,
    (currentValue) => {
      if (ref.current === null) return

      if (currentValue === 'primary') {
        runOnJS(ref.current.setColor)(primaryColor.value, 100)
      } else {
        runOnJS(ref.current.setColor)(secondaryColor.value, 100)
      }
    },
  )

  return {
    selectedColor,
    primaryColor,
    secondaryColor,
    ref,
  }
}

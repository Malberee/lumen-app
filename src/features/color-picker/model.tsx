import {
  type FC,
  type PropsWithChildren,
  type RefObject,
  createContext,
  useContext,
  useRef,
} from 'react'
import { type SharedValue, useSharedValue } from 'react-native-reanimated'
import type { ColorPickerRef } from 'reanimated-color-picker'

import { useModesStore } from '@entities/mode'

import { ColorPicker } from './ui'

interface ColorPickerProviderProps extends PropsWithChildren {
  colors: Record<string, string>
  onClose: () => void
}

type Context = {
  colors: SharedValue<Record<string, string>>
  selectedColor: SharedValue<string>
  ref: RefObject<ColorPickerRef>
  selectColor: (color: string) => void
  onApply: () => void
  onChange: (color: string) => void
}

const ColorPickerContext = createContext<Context | null>(null)

export const ColorPickerProvider: FC<ColorPickerProviderProps> = ({
  colors,
  onClose,
}) => {
  const colorsList = useSharedValue(colors)
  const selectedColor = useSharedValue(Object.keys(colors)[0])

  const updateColors = useModesStore((state) => state.updateColors)

  const ref = useRef<ColorPickerRef>(null)

  const onChange = (color: string) => {
    colorsList.value = { ...colorsList.value, [selectedColor.value]: color }
  }

  const selectColor = (color: string) => {
    if (ref.current === null) return

    ref.current.setColor(colorsList.value[color])

    selectedColor.value = color
  }

  const onApply = () => {
    updateColors(colorsList.value)
    onClose()
  }

  return (
    <ColorPickerContext.Provider
      value={{
        colors: colorsList,
        selectedColor,
        ref,
        selectColor,
        onChange,
        onApply,
      }}
    >
      <ColorPicker onApply={onApply} />
    </ColorPickerContext.Provider>
  )
}

export const useColorPicker = () => useContext(ColorPickerContext)!

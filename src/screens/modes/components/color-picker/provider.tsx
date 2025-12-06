import {
  createContext,
  useEffect,
  useRef,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react'
import { BackHandler } from 'react-native'
import {
  type DerivedValue,
  type SharedValue,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'
import ReanimatedColorPicker, {
  type ColorFormatsObject,
  type ColorPickerRef,
} from 'reanimated-color-picker'

import type { ModeType } from '@store'

import { arrayToObject } from './utils'

interface ProviderProps extends PropsWithChildren {
  colors: ModeType['colors']
  onApply: (colors: ModeType['colors']) => void
}

export type ContextType = {
  isOpen: boolean
  currentColors: DerivedValue<string[]>
  selectedColor: number
  shouldAnimate: SharedValue<boolean>
  selectColor: (index: number) => void
  handleApply: () => void
  open: () => void
  close: () => void
}

export const Context = createContext({} as ContextType)

export const Provider: FC<ProviderProps> = ({ colors, children, onApply }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState(0)

  const pickerRef = useRef<ColorPickerRef>(null)

  const shouldAnimate = useSharedValue(false)
  const currentColors = useSharedValue(arrayToObject(colors))
  const arrayCurrentColors = useDerivedValue(() =>
    Object.values(currentColors.value),
  )

  const selectColor = (index: number) => {
    setSelectedColor(index)
    pickerRef.current?.setColor(arrayCurrentColors.value[index])
  }

  const handleApply = () => {
    setIsOpen(false)
    onApply(arrayCurrentColors.value)
  }

  const handleChange = ({ hex }: ColorFormatsObject) => {
    'worklet'
    currentColors.modify((value) => {
      'worklet'
      value[selectedColor] = hex
      return value
    })
  }

  const syncColorsWithStore = () => {
    setSelectedColor(0)
    shouldAnimate.value = true
    currentColors.value = arrayToObject(colors)
    if (colors.length) pickerRef.current?.setColor(colors[0])
  }

  const close = () => {
    setIsOpen(false)
    syncColorsWithStore()
  }

  useEffect(() => {
    syncColorsWithStore()
  }, [colors])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setIsOpen(false)
        return true
      },
    )

    return () => backHandler.remove()
  }, [])

  return (
    <ReanimatedColorPicker
      ref={pickerRef}
      onChange={handleChange}
      style={{ flex: 1 }}
    >
      <Context.Provider
        value={{
          isOpen,
          currentColors: arrayCurrentColors,
          selectedColor,
          shouldAnimate,
          handleApply,
          selectColor,
          open: () => setIsOpen(true),
          close,
        }}
      >
        {children}
      </Context.Provider>
    </ReanimatedColorPicker>
  )
}

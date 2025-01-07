import {
  type FC,
  type PropsWithChildren,
  type RefObject,
  createContext,
  useContext,
  useRef,
} from 'react'
import { type SharedValue, useSharedValue } from 'react-native-reanimated'
import type { ICarouselInstance } from 'react-native-reanimated-carousel'

import { useModesStore } from './store'

type Context = {
  ref: RefObject<ICarouselInstance>
  shouldAnimateLeds: SharedValue<boolean>
  handleSelect: (value: string) => void
}

const ModesContext = createContext<Context | null>(null)

export const ModesProvider: FC<PropsWithChildren> = ({ children }) => {
  const shouldAnimateLeds = useSharedValue(true)
  const setMode = useModesStore((state) => state.setMode)
  const modes = useModesStore((state) => state.modes)
  const ref = useRef<ICarouselInstance>(null)

  const handleSelect = (value: string) => {
    ref.current?.scrollTo({
      index: modes.findIndex((mode) => mode.name === value),
      animated: true,
    })
    setMode(value)
  }

  return (
    <ModesContext.Provider value={{ ref, shouldAnimateLeds, handleSelect }}>
      {children}
    </ModesContext.Provider>
  )
}

export const useModesContext = () => useContext(ModesContext)!

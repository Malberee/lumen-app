import { useNetInfo } from '@react-native-community/netinfo'
import {
  type FC,
  type PropsWithChildren,
  type RefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { type SharedValue, useSharedValue } from 'react-native-reanimated'
import type { ICarouselInstance } from 'react-native-reanimated-carousel'

import { UDP } from '@services'
import { useModesStore } from '@store'
import { modesToArray } from '@utils'

import { subscribeStore } from './subscribe-store'

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

  const data = modesToArray(modes)

  const handleSelect = (value: string) => {
    ref.current?.scrollTo({
      index: data.findIndex((mode) => mode.name === value),
      animated: true,
    })
    setMode(value)
  }

  const { isConnected } = useNetInfo()

  useEffect(() => {
    const init = async () => {
      await UDP.close()
      await UDP.init()
    }

    init()
  }, [isConnected])

  useEffect(() => {
    const unsubscribe = subscribeStore()

    return () => {
      unsubscribe()
      UDP.close()
    }
  }, [])

  return (
    <ModesContext.Provider value={{ ref, shouldAnimateLeds, handleSelect }}>
      {children}
    </ModesContext.Provider>
  )
}

export const useModesContext = () => useContext(ModesContext)!

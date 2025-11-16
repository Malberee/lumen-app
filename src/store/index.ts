import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { modes } from '@constants'

export type ModeName = (typeof modes)[number]['name']

export type ModeType = {
  name: string
  colors: {
    primary?: string
    secondary?: string
  }
  speed?: number
  length?: number
}

export type Store = {
  modes: ModeType[]
  currentMode: number
  power: boolean
  setMode: (mode: ModeName) => void
  setColors: (colors: ModeType['colors']) => void
  setParams: (param: 'speed' | 'length', value: number) => void
  setPower: (power: boolean) => void
}

export const useStore = create<Store>()(
  persist(
    subscribeWithSelector(
      immer((set) => ({
        currentMode: 0,
        modes,
        power: true,
        setMode: (mode) => {
          set((state) => {
            state.currentMode = state.modes.findIndex((m) => m.name === mode)
          })
        },
        setColors: (colors) => {
          set((state) => {
            state.modes[state.currentMode].colors = colors
          })
        },
        setParams: (param, value) => {
          set((state) => {
            state.modes[state.currentMode][param] = value
          })
        },
        setPower: (power) => {
          set((state) => {
            state.power = power
          })
        },
      })),
    ),
    {
      name: 'lumen-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        modes: state.modes,
        currentMode: state.currentMode,
      }),
    },
  ),
)

export * from './selectors'

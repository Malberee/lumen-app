import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { type ModeSetting, type ModeType, modes } from '@constants'

export type Store = {
  modes: ModeType[]
  currentMode: string
  power: boolean
  setMode: (mode: string) => void
  setColors: (colors: string[]) => void
  setSetting: (param: ModeSetting, value: number) => void
  setPower: (power: boolean) => void
}

export const useStore = create<Store>()(
  persist(
    subscribeWithSelector(
      immer((set) => ({
        currentMode: 'solid',
        modes,
        power: true,
        setMode: (mode) => {
          set((state) => {
            state.currentMode = mode
          })
        },
        setColors: (colors) => {
          set((state) => {
            state.modes = state.modes.map((mode) => {
              if (mode.name === state.currentMode) {
                return { ...mode, colors }
              }
              return mode
            })
          })
        },
        setSetting: (setting, value) => {
          set((state) => {
            state.modes = state.modes.map((mode) => {
              if (mode.name === state.currentMode) {
                return { ...mode, [setting]: value }
              }
              return mode
            })
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

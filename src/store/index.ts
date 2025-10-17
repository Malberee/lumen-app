import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { modes } from '@constants'

export type ColorType = 'primary' | 'secondary'
export type ModeType = {
  name: string
  speed?: number
  length?: number
  colors: Record<string, string>
}
export type ModesList = Record<string, Omit<ModeType, 'name'>>

export interface ModesState {
  currentMode: ModeType
  modes: ModesList
  power: boolean
  setMode: (mode: string) => void
  updateColors: (colors: Record<string, string>) => void
  updateParams: (params: { param: 'speed' | 'length'; value: number }) => void
  setPower: (power: boolean) => void
}

export const useModesStore = create<ModesState>()(
  persist(
    subscribeWithSelector(
      immer((set) => ({
        currentMode: {
          name: 'solid',
          ...modes.solid,
        },
        modes,
        power: true,
        setMode: (mode) => {
          set((state) => {
            state.currentMode = { name: mode, ...state.modes[mode] }
          })
        },
        updateColors: (colors) => {
          set((state) => {
            state.modes[state.currentMode.name].colors = colors
            state.currentMode.colors = colors
          })
        },
        updateParams: ({ param, value }) => {
          set((state) => {
            state.modes[state.currentMode.name][param] = value
            state.currentMode[param] = value
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
      name: 'modes',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        modes: state.modes,
        currentMode: state.currentMode,
      }),
    },
  ),
)

export * from './selectors'

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { modes } from '../config'

type Param = 'speed' | 'length'

export type ColorType = 'primary' | 'secondary'

export type ModeType = {
  name: string
  params: Partial<Record<Param, number>>
  colors: Record<string, string>
}

export interface ModesState {
  currentMode: string
  modes: ModeType[]
  setMode: (mode: string) => void
  updateColors: (colors: Record<string, string>) => void
  updateParams: (params: Partial<Record<Param, number>>) => void
}

export const useModesStore = create<ModesState>()(
  immer((set) => ({
    currentMode: 'carousel',
    modes,
    setMode: (mode) => {
      set({ currentMode: mode })
    },
    updateColors: (colors) => {
      set((state) => {
        const currentModeIndex = state.modes.findIndex(
          (mode) => mode.name === state.currentMode,
        )

        state.modes[currentModeIndex].colors = colors
      })
    },
    updateParams: (params) => {
      set((state) => {
        const currentModeIndex = state.modes.findIndex(
          (mode) => mode.name === state.currentMode,
        )

        state.modes[currentModeIndex].params = {
          ...state.modes[currentModeIndex].params,
          ...params,
        }
      })
    },
  })),
)

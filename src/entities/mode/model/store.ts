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
}

export const useModesStore = create<ModesState>()(
  immer((set) => ({
    currentMode: 'carousel',
    modes,
    setMode: (mode) => {
      set({ currentMode: mode })
    },
    updateColors: (colors: Record<string, string>) => {
      set((state) => {
        const currentModeIndex = state.modes.findIndex(
          (mode) => mode.name === state.currentMode,
        )

        state.modes[currentModeIndex].colors = colors
      })
    },
  })),
)

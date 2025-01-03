import { create } from 'zustand'

import { modes } from '../config'

type Param = 'speed' | 'length'

export type ColorType = 'primary' | 'secondary'

export type ModeType = {
  name: string
  params: Partial<Record<Param, number>>
  colors: Partial<Record<ColorType, string>>
}

export interface ModesState {
  currentMode: string
  modes: Record<string, ModeType>
  setMode: (mode: string) => void
}

export const useModesStore = create<ModesState>((set, get) => ({
  currentMode: 'loading',
  modes,
  setMode: (mode) => {
    set({ currentMode: mode.replace(/ /g, '-') })
  },
  updateParams: (params: Partial<ModeType>) => {
    set((state) => ({
      modes: {
        ...state.modes,
        [state.currentMode]: { ...state.modes[state.currentMode], ...params },
      },
    }))
  },
}))

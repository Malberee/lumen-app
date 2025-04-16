import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { modes } from '../config'

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
  setMode: (mode: string) => void
  updateColors: (colors: Record<string, string>) => void
  updateParams: (params: { param: 'speed' | 'length'; value: number }) => void
}

export const useModesStore = create<ModesState>()(
  immer((set) => ({
    currentMode: {
      name: 'carousel',
      speed: 200,
      colors: { primary: '#ffffff', secondary: '#000000' },
    },
    modes,
    setMode: (mode) => {
      set({ currentMode: { name: mode, ...modes[mode] } })
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
  })),
)

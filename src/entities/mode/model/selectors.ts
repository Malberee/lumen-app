import type { ModesState } from './store'

export const selectAllModes = (state: ModesState) => state.modes

export const selectCurrentMode = (state: ModesState) =>
  state.modes.find((mode) => mode.name === state.currentMode)!

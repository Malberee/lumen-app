import type { ModesState } from './store'

export const selectModes = (state: ModesState) => Object.values(state.modes)

export const selectCurrentMode = (state: ModesState) =>
  state.modes[state.currentMode]

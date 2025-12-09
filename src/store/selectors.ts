import type { Store } from './index'

export const selectAllModes = (state: Store) => state.modes
export const selectCurrentMode = (state: Store) =>
  state.modes[state.currentMode]
export const selectPower = (state: Store) => state.power

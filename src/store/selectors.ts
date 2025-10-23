import type { State } from './index'

export const selectAllModes = (state: State) => state.modes
export const selectCurrentMode = (state: State) => state.currentMode
export const selectPower = (state: State) => state.power

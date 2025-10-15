import type { ModesState } from './index'

export const selectAllModes = (state: ModesState) => state.modes
export const selectCurrentMode = (state: ModesState) => state.currentMode
export const selectPower = (state: ModesState) => state.power

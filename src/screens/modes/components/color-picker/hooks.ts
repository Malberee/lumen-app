import { useContext } from 'react'

import { Context } from './provider'

export const useColorPicker = () => useContext(Context)

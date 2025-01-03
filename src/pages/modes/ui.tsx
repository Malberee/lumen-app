import React from 'react'

import { LedRing } from '@widgets/led-ring'
import { ModeCarousel } from '@widgets/mode-carousel'
import { ModeList } from '@widgets/mode-list'

import { ModesProvider } from '@entities/mode'

export const Modes = () => {
  return (
    <ModesProvider>
      <LedRing />
      <ModeCarousel />
      <ModeList />
    </ModesProvider>
  )
}

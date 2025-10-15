import React from 'react'

import { ModesProvider } from '@providers'

import { ModeCarousel } from './carousel'
import { Header } from './header'
import { LedRing } from './led-ring'

export const Modes = () => {
  return (
    <ModesProvider>
      <Header />
      <LedRing />
      <ModeCarousel />
    </ModesProvider>
  )
}

import React from 'react'

import { ModesProvider } from '@providers'

import { Cards } from './cards'
import { Header } from './header'
import { LedRing } from './led-ring'

export const Modes = () => {
  return (
    <ModesProvider>
      <Header />
      <LedRing />
      <Cards />
    </ModesProvider>
  )
}

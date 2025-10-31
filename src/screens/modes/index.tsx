import React from 'react'

import { Cards } from './cards'
import { Header } from './header'
import { useUdpSync } from './hooks'
import { LedRing } from './led-ring'

export const Modes = () => {
  useUdpSync()

  return (
    <>
      <Header />
      <LedRing />
      <Cards />
    </>
  )
}

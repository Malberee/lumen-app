import React from 'react'

import { Cards, Header, LedRing } from './components'
import { useUdpSync } from './hooks'

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

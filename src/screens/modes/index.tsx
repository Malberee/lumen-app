import { useNetInfo } from '@react-native-community/netinfo'
import React, { useEffect } from 'react'

import { UDP } from '@services'

import { Cards } from './cards'
import { Header } from './header'
import { useUdpSync } from './hooks'
import { LedRing } from './led-ring'

export const Modes = () => {
  const { isConnected } = useNetInfo()

  useEffect(() => {
    const init = async () => {
      await UDP.close()
      await UDP.init()
    }

    init()
  }, [isConnected])

  useUdpSync()

  return (
    <>
      <Header />
      <LedRing />
      <Cards />
    </>
  )
}

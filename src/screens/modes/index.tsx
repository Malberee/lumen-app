import React from 'react'
import { Text } from 'react-native'

import { selectAllModes, useStore } from '@store'
import { modesToArray } from '@utils'

import { Surface } from './components'
import { Grid } from './components/grid'
import { useUdpSync } from './hooks'

export const Modes = () => {
  useUdpSync()

  const modes = useStore(selectAllModes)

  return (
    <>
      {/* <Header />
      <LedRing />
      <Cards /> */}
      <Grid
        data={modesToArray(modes)}
        renderItem={(item) => (
          <Surface>
            <Text className="text-foreground">{item.name}</Text>
          </Surface>
        )}
      />
    </>
  )
}

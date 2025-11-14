import { chunk } from 'lodash'
import React from 'react'

import { selectAllModes, useStore } from '@store'
import { modesToArray } from '@utils'

import { Grid, HorizontalPager, Mode } from './components'
import { useUdpSync } from './hooks'

export const Modes = () => {
  useUdpSync()

  const modes = useStore(selectAllModes)

  return (
    <>
      {/* <Header />
      <LedRing />
      <Cards /> */}

      <HorizontalPager
        data={chunk(modesToArray(modes), 6)}
        renderItem={({ item }) => (
          <Grid data={item} renderItem={(item) => <Mode name={item.name} />} />
        )}
      />
    </>
  )
}

import { chunk } from 'lodash'
import React from 'react'
import { View } from 'react-native'

import { selectAllModes, useStore } from '@store'
import { modesToArray } from '@utils'

import { Controls, Grid, HorizontalPager, Mode } from './components'
import { useUdpSync } from './hooks'

export const Modes = () => {
  useUdpSync()

  const modes = useStore(selectAllModes)

  return (
    <View className="flex-1 flex-col gap-8">
      {/* <Header /> */}
      {/* <LedRing /> */}
      {/* <Cards /> */}

      <HorizontalPager
        data={chunk(modesToArray(modes), 6)}
        renderItem={({ item }) => (
          <Grid data={item} renderItem={(item) => <Mode name={item.name} />} />
        )}
      />
      <Controls />
    </View>
  )
}

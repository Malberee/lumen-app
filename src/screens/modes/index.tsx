import { chunk } from 'lodash'
import React from 'react'
import { Text } from 'react-native'

import { selectAllModes, useStore } from '@store'
import { modesToArray } from '@utils'

import { Grid, HorizontalPager, Surface } from './components'
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
          <Grid
            data={item}
            renderItem={(item) => (
              <Surface className="aspect-square p-1.5">
                <Text className="my-auto text-center capitalize text-foreground">
                  {item.name}
                </Text>
              </Surface>
            )}
          />
        )}
      />
    </>
  )
}

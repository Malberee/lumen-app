import chunk from 'lodash.chunk'
import React from 'react'
import { View } from 'react-native'

import { selectAllModes, selectCurrentMode, useStore } from '@store'

import {
  ColorPicker,
  Controls,
  Grid,
  Header,
  HorizontalPager,
  Mode,
} from './components'
import { useUdpSync } from './hooks'

export const Modes = () => {
  useUdpSync()
  const modes = useStore(selectAllModes)
  const { colors } = useStore(selectCurrentMode)
  const setColors = useStore((state) => state.setColors)

  return (
    <ColorPicker.Provider colors={colors} onApply={setColors}>
      <ColorPicker.Preview />
      <Header />

      <View className="mb-8 mt-auto flex-col gap-8">
        <HorizontalPager
          data={chunk(modes, 6)}
          renderItem={({ item }) => (
            <Grid
              data={item}
              renderItem={(item) => <Mode name={item.name} />}
            />
          )}
        />

        <Controls />

        {colors.length ? <ColorPicker.Trigger /> : null}
      </View>

      <ColorPicker.Consumer>
        {({ isOpen }) =>
          isOpen ? (
            <View className="absolute bottom-12 z-20 flex-col gap-4">
              <ColorPicker.Controls />
              {colors.length > 1 ? <ColorPicker.Tabs /> : null}
            </View>
          ) : null
        }
      </ColorPicker.Consumer>
    </ColorPicker.Provider>
  )
}

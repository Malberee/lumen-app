import chunk from 'lodash.chunk'
import React from 'react'
import { View } from 'react-native'
import { colorKit } from 'reanimated-color-picker'

import { selectAllModes, selectCurrentMode, useStore } from '@store'

import {
  ColorPicker,
  Controls,
  Grid,
  Header,
  HorizontalPager,
  Mode,
} from './components'
import { useControllerSync } from './hooks'

export const Modes = () => {
  useControllerSync()
  const modes = useStore(selectAllModes)
  const { colors } = useStore(selectCurrentMode)
  const setColors = useStore((state) => state.setColors)

  const handleApply = (colors: string[]) => {
    const colorObjects = colors.map((color) => {
      const { a, ...rgb } = colorKit.RGB(color).object()
      return rgb
    })

    setColors(colorObjects)
  }

  return (
    <ColorPicker.Provider
      colors={colors.map((color) => colorKit.RGB(color).string())}
      onApply={handleApply}
    >
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

import { router } from 'expo-router'
import chunk from 'lodash.chunk'
import React, { useEffect } from 'react'
import { View } from 'react-native'

import { routes } from '@constants'
import { useConnectionState } from '@hooks'
import { ConnectionStatus, DisconnectReason } from '@services'
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

  const connectionState = useConnectionState()

  useEffect(() => {
    let pathname: string | undefined

    if (connectionState.status === ConnectionStatus.CONNECTING) {
      pathname = routes.connection
    } else if (connectionState.status === ConnectionStatus.DISCONNECTED) {
      pathname =
        connectionState.reason === DisconnectReason.MANUAL
          ? routes.home
          : routes.connection
    }

    if (pathname) {
      router.replace({
        pathname,
        params: { redirectTo: routes.modes },
      })
    }
  }, [connectionState])

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

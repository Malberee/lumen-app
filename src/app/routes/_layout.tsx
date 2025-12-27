import { PortalProvider } from '@gorhom/portal'
import { router, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Button } from 'merlo-ui'
import { rem } from 'nativewind'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { configureReanimatedLogger } from 'react-native-reanimated'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'

import { colors } from '@constants'

import '../global.css'

global.Buffer = require('buffer/').Buffer
configureReanimatedLogger({ strict: false })

const RootLayout = () => {
  const { top, bottom } = useSafeAreaInsets()

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <StatusBar style="light" translucent />
        <View className="flex-1 dark">
          <PortalProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: colors.background,
                  paddingTop: top,
                  paddingBottom: bottom,
                  paddingHorizontal: rem.get(),
                },
              }}
            />
          </PortalProvider>
        </View>

        {__DEV__ ? (
          <View className="absolute left-1/2 top-12 -translate-x-1/2 flex-row gap-4">
            <Button onPress={() => router.replace('/')}>Connect</Button>
            <Button onPress={() => router.replace('/ap')}>Ap</Button>
            <Button onPress={() => router.replace('/modes')}>Modes</Button>
          </View>
        ) : null}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default RootLayout

import { PortalProvider } from '@gorhom/portal'
import { router, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Button } from 'merlo-ui'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { configureReanimatedLogger } from 'react-native-reanimated'

import '../global.css'

global.Buffer = require('buffer/').Buffer
configureReanimatedLogger({ strict: false })

const RootLayout = () => {
  return (
    <GestureHandlerRootView>
      <StatusBar style="light" translucent />
      <View className="flex-1 bg-[#09090B] dark">
        <PortalProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#09090B' },
            }}
          />
        </PortalProvider>
      </View>

      {/* DEV */}
      <View className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-row gap-4">
        <Button onPress={() => router.navigate('/ap')}>Connect page</Button>
        <Button onPress={() => router.navigate('/modes')}>Modes page</Button>
      </View>
    </GestureHandlerRootView>
  )
}

export default RootLayout

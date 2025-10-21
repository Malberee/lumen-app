import { PortalProvider } from '@gorhom/portal'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
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
    </GestureHandlerRootView>
  )
}

export default RootLayout

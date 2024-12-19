import { Slot } from 'expo-router'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const RootLayout = () => {
  return (
    <GestureHandlerRootView>
      <View className="flex h-screen w-screen items-center justify-center bg-[#09090B] dark">
        <Slot />
      </View>
    </GestureHandlerRootView>
  )
}

export default RootLayout

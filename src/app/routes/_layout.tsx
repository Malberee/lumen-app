import * as NavigationBar from 'expo-navigation-bar'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Dimensions, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const RootLayout = () => {
  const windowHeight = Dimensions.get('screen').height

  useEffect(() => {
    NavigationBar.setBehaviorAsync('overlay-swipe')
    NavigationBar.setVisibilityAsync('hidden')
  }, [])

  return (
    <GestureHandlerRootView>
      <StatusBar style="light" backgroundColor="#09090b" />
      <View
        style={{ height: windowHeight }}
        className="flex w-screen items-center justify-center bg-[#09090B] dark"
      >
        <Slot />
      </View>
    </GestureHandlerRootView>
  )
}

export default RootLayout

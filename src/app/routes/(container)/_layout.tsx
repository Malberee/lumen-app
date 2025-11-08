import { Stack } from 'expo-router'
import { rem } from 'nativewind'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Container = () => {
  const { top, bottom } = useSafeAreaInsets()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#09090B',
          paddingTop: top,
          paddingBottom: bottom,
          paddingHorizontal: rem.get(),
        },
      }}
    />
  )
}

export default Container

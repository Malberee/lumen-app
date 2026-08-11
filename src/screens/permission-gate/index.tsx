import { router } from 'expo-router'
import { Button } from 'merlo-ui'
import { useEffect } from 'react'
import { Linking, PermissionsAndroid, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'

import { routes } from '@constants'

export const PermissionGate = () => {
  const requestPermission = async () => {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        router.replace(routes.connection)
      }
    } catch {
      Toast.show({
        type: 'error',
        text1:
          'Failed to get permission. Please go to your device settings to allow access manually.',
      })
    }
  }

  useEffect(() => {
    requestPermission()
  }, [])

  return (
    <View className="flex-1 flex-col items-center justify-center gap-4">
      <Text className="text-center text-lg text-foreground">
        To connect to the device, this application requires access to your
        location
      </Text>
      <Button size="lg" onPress={() => Linking.openSettings()}>
        Go to Settings
      </Button>
    </View>
  )
}

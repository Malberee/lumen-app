import { router } from 'expo-router'
import { Button } from 'merlo-ui'
import { useEffect } from 'react'
import { Linking, PermissionsAndroid, Text, View } from 'react-native'

export const PermissionGate = () => {
  useEffect(() => {
    const request = async () => {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        router.replace('/connection')
      }
    }

    request()
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

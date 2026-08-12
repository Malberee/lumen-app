import { router, useLocalSearchParams } from 'expo-router'
import { Button, Spinner } from 'merlo-ui'
import { useEffect } from 'react'
import { Text, View } from 'react-native'

import { routes } from '@constants'
import { useConnectionState } from '@hooks'
import { ConnectionStatus, controllerClient, DisconnectReason } from '@services'

import { WiFiOffIcon } from './components'

type ConnectionSearchParams = {
  redirectTo: string
}

export const Connection = () => {
  const { redirectTo = routes.connectDeviceToAp } =
    useLocalSearchParams<ConnectionSearchParams>()
  const connectionState = useConnectionState()

  useEffect(() => {
    const status = connectionState.status

    if (status === ConnectionStatus.CONNECTED) {
      router.replace(redirectTo)
    } else if (
      status === ConnectionStatus.DISCONNECTED &&
      connectionState.reason === DisconnectReason.MANUAL
    ) {
      controllerClient.connect()
    }
  }, [connectionState])

  return (
    <View className="flex-1 flex-row items-center justify-center">
      {connectionState.status === ConnectionStatus.CONNECTING ? (
        <Spinner
          size="lg"
          color="default"
          label="Checking the connection to the device..."
        />
      ) : (
        <View className="flex-col items-center">
          <WiFiOffIcon className="mb-6 text-warning" width={128} height={128} />
          <Text className="text-large text-warning-500">
            Unable to connect to the device
          </Text>
          <Text className="mb-6 text-large text-warning-700">
            You may not be connected to an access point.
          </Text>
          <Button
            size="lg"
            color="warning"
            onPress={() => controllerClient.connect()}
          >
            Try again
          </Button>
        </View>
      )}
    </View>
  )
}

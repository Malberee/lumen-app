import { router } from 'expo-router'
import { Button, Spinner } from 'merlo-ui'
import { useCallback, useEffect, useState } from 'react'
import { Text, View } from 'react-native'

import { WiFiOffIcon } from './components'
import { pingDevice } from './services'

type ConnectionState = 'checking' | 'not-connected'

export const Connection = () => {
  const [connectionState, setConnectionState] =
    useState<ConnectionState>('checking')

  const checkConnection = useCallback(async () => {
    setConnectionState('checking')
    try {
      await pingDevice()
      router.replace('/ap')
    } catch {
      setConnectionState('not-connected')
    }
  }, [])

  useEffect(() => {
    checkConnection()
  }, [checkConnection])

  return (
    <View className="flex-1 flex-row items-center justify-center">
      {connectionState === 'checking' ? (
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
          <Button size="lg" color="warning" onPress={checkConnection}>
            Try again
          </Button>
        </View>
      )}
    </View>
  )
}

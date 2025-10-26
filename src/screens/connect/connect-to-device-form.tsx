import { router, useLocalSearchParams } from 'expo-router'
import { Button } from 'merlo-ui'
import { useState } from 'react'
import { Text, View } from 'react-native'
import Toast from 'react-native-toast-message'
import WiFiManager from 'react-native-wifi-reborn'

import { UDP } from '@services'

import { BackButton, Card, PasswordInput } from './components'

export const ConnectToDeviceForm = () => {
  const { network } = useLocalSearchParams<{ network: string }>()
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchConnect = async () => {
    await UDP.init()
    await UDP.sendMessage('CNT')

    const response = await UDP.waitForResponse()

    if (response === 'OK') {
      router.navigate('./ap')
    }

    await UDP.close()
  }

  const handleConnect = async (ssid: string) => {
    setIsLoading(true)
    try {
      setError('')
      await WiFiManager.forceWifiUsageWithOptions(true, { noInternet: true })
      await WiFiManager.connectToProtectedSSID(
        ssid,
        password,
        true,
        false,
      ).catch(() => {
        throw new Error(
          'Wrong password or connection error. Try again later.',
          { cause: 'wrong password' },
        )
      })
      await fetchConnect()
    } catch (e) {
      if (e instanceof Error) {
        if (e.cause === 'wrong password') {
          setError('Wrong password or connection error. Try again later.')
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: e.message,
          })
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card title="Connect to device" action={<BackButton />}>
      <View className="flex-col gap-4">
        <Text className="text-2xl text-foreground">{network}</Text>
        <PasswordInput
          onValueChange={setPassword}
          value={password}
          isInvalid={!!error}
          errorMessage={error}
        />
        <Button
          isLoading={isLoading}
          size="lg"
          onPress={() => handleConnect(network)}
        >
          Connect
        </Button>
      </View>
    </Card>
  )
}

import { router } from 'expo-router'
import { useState } from 'react'
import Toast from 'react-native-toast-message'
import WiFiManager from 'react-native-wifi-reborn'

import { UDP } from '@shared/api'

export const useConnectToDevice = () => {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchConnect = async () => {
    await UDP.init()
    await UDP.sendMessage('CONNECT')

    const response = await UDP.waitForResponse()

    if (response === 'OK') {
      router.navigate('./ap')
    }

    await UDP.close()
  }

  const onConnect = async (ssid: string) => {
    setIsLoading(true)
    try {
      setError('')
      await WiFiManager.forceWifiUsageWithOptions(true, { noInternet: true })
      await WiFiManager.connectToProtectedSSID(ssid, password, true, false)
      await fetchConnect()
    } catch {
      setError('Wrong password or connection error. Try again later.')
      Toast.show({
        type: 'error',
        text1: 'Request timeout!',
        text2:
          'There`s no connection to the board.\nLooks like you are connected to the\nwrong network.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { password, isLoading, error, setPassword, onConnect }
}

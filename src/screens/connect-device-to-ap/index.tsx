import { Link, router } from 'expo-router'
import { Button, Input } from 'merlo-ui'
import { useState } from 'react'
import { Text, View } from 'react-native'
import Toast from 'react-native-toast-message'

import { UDP } from '@services'

import { ErrorToast, PasswordInput, WiFiIcon } from './components'
import { handleConnectionError, validateFields } from './helpers'
import { useForm } from './hooks'
import { sendCredentials } from './services'

export const ConnectDeviceToAP = () => {
  const { state, dispatch, resetErrors } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    resetErrors()

    const errors = validateFields(state.values)

    if (Object.keys(errors).length) {
      if (errors.ssid) dispatch({ field: 'ssid', error: errors.ssid })
      if (errors.password)
        dispatch({ field: 'password', error: errors.password })

      return
    }

    setIsLoading(true)

    try {
      const espIp = await sendCredentials(
        state.values.ssid.trim(),
        state.values.password.trim(),
      )
      UDP.setIP(espIp)
      router.replace('/modes')
    } catch (error) {
      if (error instanceof Error) handleConnectionError(error.message, dispatch)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <View className="mb-auto mt-auto flex-col gap-4">
        <Text className="text-xl text-foreground">
          Connect device to access point
        </Text>

        <Input
          size="lg"
          variant="faded"
          placeholder="Enter SSID"
          startContent={
            <WiFiIcon className="text-foreground-400" width={20} height={20} />
          }
          value={state.values.ssid}
          isInvalid={!!state.errors.ssid}
          errorMessage={state.errors.ssid}
          onValueChange={(value) => dispatch({ field: 'ssid', value })}
          autoCapitalize="none"
        />
        <PasswordInput
          size="lg"
          variant="faded"
          placeholder="Enter password"
          value={state.values.password}
          isInvalid={!!state.errors.password}
          errorMessage={state.errors.password}
          onValueChange={(value) => dispatch({ field: 'password', value })}
          autoCapitalize="none"
        />

        <Button size="lg" onPress={handleSubmit} isLoading={isLoading}>
          {isLoading ? 'Connecting...' : 'Connect'}
        </Button>
      </View>

      <Link href="/modes" replace className="mb-4 text-primary underline">
        I want to stay connected to the device's access point.
      </Link>

      <Toast
        config={{ error: (props) => <ErrorToast {...props} /> }}
        position="bottom"
        visibilityTime={10_000}
        autoHide
      />
    </>
  )
}

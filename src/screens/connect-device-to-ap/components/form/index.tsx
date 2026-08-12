import { Button, Input } from 'merlo-ui'
import { type FC, useState } from 'react'
import { Text, View } from 'react-native'

import { controllerClient } from '@services'

import { WiFiIcon } from '../icons'
import { handleConnectionError, validateFields } from './helpers'
import { useForm } from './hooks'
import { PasswordInput } from './password-input'

interface FormProps {
  onSubmit: () => void
  onSuccess: (network: string) => void
  onError: (error: Error) => void
}

export const Form: FC<FormProps> = ({ onSubmit, onSuccess, onError }) => {
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
    onSubmit()

    try {
      const network = state.values.ssid.trim()

      await controllerClient.connectToWiFi(
        network,
        state.values.password.trim(),
      )

      onSuccess(network)
    } catch (error) {
      if (error instanceof Error) {
        handleConnectionError(error.message, dispatch)
        onError(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
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
  )
}

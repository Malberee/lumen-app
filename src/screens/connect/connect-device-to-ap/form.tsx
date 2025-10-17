import { router } from 'expo-router'
import { Button, Input } from 'merlo-ui'
import { useState, type FC } from 'react'
import { View } from 'react-native'

import { objToString } from '@utils'

import { PasswordInput, WiFiIcon } from '../components'
import { useForm } from './hooks'
import { sendCredentials } from './services'
import { handleConnectionError, validateFields } from './utils'

interface FormProps {
  onSuccess: () => void
}

export const Form: FC<FormProps> = ({ onSuccess }) => {
  const { state, dispatch, resetFields } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    const errors = validateFields(state.values)
    if (Object.keys(errors).length) {
      if (errors.ssid) dispatch({ field: 'ssid', error: errors.ssid })
      if (errors.password)
        dispatch({ field: 'password', error: errors.password })
      return
    }

    resetFields()

    try {
      setIsLoading(true)
      await sendCredentials(`CRD ${objToString(state.values)}`)
      onSuccess()
      setTimeout(() => {
        router.navigate('/modes')
      }, 500)
    } catch (error) {
      let errorMessage = 'Error'
      if (error instanceof Error) errorMessage = error.message
      handleConnectionError(errorMessage, dispatch)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="flex-col gap-4">
      <Input
        size="lg"
        labelPlacement="inside"
        label="SSID"
        placeholder="Enter SSID"
        startContent={
          <WiFiIcon
            className={
              state.errors.ssid ? 'text-danger' : 'text-foreground-400'
            }
            width={20}
            height={20}
          />
        }
        isInvalid={!!state.errors.ssid}
        errorMessage={state.errors.ssid}
        onValueChange={(value: string) => dispatch({ field: 'ssid', value })}
        value={state.values.ssid}
      />
      <PasswordInput
        isInvalid={!!state.errors.password}
        errorMessage={state.errors.password}
        onValueChange={(value: string) =>
          dispatch({ field: 'password', value })
        }
        value={state.values.password}
      />
      <Button size="lg" isLoading={isLoading} onPress={onSubmit}>
        Submit
      </Button>
    </View>
  )
}

import { Button, Input } from '@malberee/nextui-native'
import type { FC } from 'react'
import { View } from 'react-native'

import { PasswordInput, WiFiIcon } from '@shared/ui'

import { useConnectDeviceToAP } from '../model'

interface FormProps {
  onSuccess: () => void
}

export const Form: FC<FormProps> = ({ onSuccess }) => {
  const { state, isLoading, dispatch, onSubmit } =
    useConnectDeviceToAP(onSuccess)

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
              !!state.errors.ssid ? 'text-danger' : 'text-foreground-400'
            }
            width={20}
            height={20}
          />
        }
        isInvalid={!!state.errors.ssid}
        errorMessage={state.errors.ssid}
        onValueChange={(value) => dispatch({ field: 'ssid', value })}
        value={state.values.ssid}
      />
      <PasswordInput
        isInvalid={!!state.errors.password}
        errorMessage={state.errors.password}
        onValueChange={(value) => dispatch({ field: 'password', value })}
        value={state.values.password}
      />
      <Button size="lg" isLoading={isLoading} onPress={onSubmit}>
        Submit
      </Button>
    </View>
  )
}

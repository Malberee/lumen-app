import { Button, CloseIcon } from '@malberee/nextui-native'
import { Link, useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

import { ConnectionPanel, PasswordInput } from '@shared/ui'

import { useConnectToDevice } from './model'

export const ConnectToDevice = () => {
  const { password, isLoading, error, setPassword, onConnect } =
    useConnectToDevice()
  const { network } = useLocalSearchParams<{ network: string }>()

  return (
    <ConnectionPanel
      title="Connect to device"
      endContent={
        <Link href="../" asChild>
          <Button
            isIconOnly
            size="sm"
            color="default"
            variant="light"
            startContent={<CloseIcon className="text-foreground" width={20} />}
          />
        </Link>
      }
    >
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
          onPress={() => onConnect(network)}
        >
          Connect
        </Button>
      </View>
    </ConnectionPanel>
  )
}

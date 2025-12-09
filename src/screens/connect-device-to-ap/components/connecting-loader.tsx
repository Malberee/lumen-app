import { Spinner } from 'merlo-ui'
import type { FC } from 'react'
import { Text, View } from 'react-native'

interface ConnectingLoaderProps {
  network: string
}

export const ConnectingLoader: FC<ConnectingLoaderProps> = ({ network }) => {
  return (
    <View className="flex-1 flex-col items-center justify-center gap-1">
      <Spinner
        size="lg"
        color="default"
        label={`Waiting to connect to the ${network} network...`}
      />
      <Text className="text-center text-foreground-400">
        If this does not happen automatically, try connecting manually
      </Text>
    </View>
  )
}

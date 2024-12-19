import { Button } from '@malberee/nextui-native'
import type { FC } from 'react'
import { Text, View } from 'react-native'

import { RefreshIcon } from './refresh-icon'

interface HeaderProps {
  isLoading: boolean
  reScanWifiList: () => void
}

export const Header: FC<HeaderProps> = ({ isLoading, reScanWifiList }) => {
  return (
    <View className="flex-row items-center">
      <Text className="flex-1 text-lg text-foreground">Connect to device</Text>
      <Button
        variant="light"
        color="default"
        radius="sm"
        size="sm"
        isIconOnly
        startContent={
          <RefreshIcon width="16" height="16" className="text-foreground" />
        }
        onPress={() => {
          if (!isLoading) {
            reScanWifiList()
          }
        }}
      />
    </View>
  )
}

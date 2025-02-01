import { Button, Spinner } from '@malberee/nextui-native'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import { ConnectionPanel } from '@shared/ui'

import { useNetworkList } from '../model'
import { NetworkItem } from './network-item'
import { ReloadIcon } from './reload-icon'

export const NetworkList = () => {
  const { isLoading, networkList, reScanNetworkList } = useNetworkList()

  return (
    <ConnectionPanel
      title="Connect to device"
      endContent={
        <Button
          color="default"
          variant="light"
          size="sm"
          isIconOnly
          isDisabled={isLoading}
          startContent={<ReloadIcon className="text-white" width={20} />}
          onPress={reScanNetworkList}
        />
      }
    >
      <View className="h-32 flex-row items-center justify-center">
        {isLoading ? (
          <Spinner size="lg" color="white" />
        ) : (
          <FlatList
            data={networkList}
            renderItem={({ item }) => <NetworkItem {...item} />}
            keyExtractor={(item) => item.BSSID}
            className="h-full"
          />
        )}
      </View>
    </ConnectionPanel>
  )
}

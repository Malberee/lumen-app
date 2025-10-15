import { Button, Spinner } from '@malberee/heroui-native'
import { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import WifiManager, { type WifiEntry } from 'react-native-wifi-reborn'

import { Card } from '../components/card'
import { NetworkItem } from './network-item'
import { RefreshIcon } from './refresh-icon'
import { requestPermission } from './request-permission'

export const NetworkList = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [networkList, setNetworkList] = useState<WifiEntry[]>([])

  const reScanNetworkList = async () => {
    setIsLoading(true)
    const list = await WifiManager.reScanAndLoadWifiList()
    setNetworkList(list)
    setIsLoading(false)
  }

  useEffect(() => {
    const getNetworkList = async () => {
      const granted = await requestPermission()

      if (granted === 'granted') {
        setIsLoading(true)
        const list = await WifiManager.loadWifiList()
        setNetworkList(list)
        setIsLoading(false)
      }
    }

    const timeout = setTimeout(() => getNetworkList(), 300)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <Card
      title="Connect to device"
      action={
        <Button
          color="default"
          variant="light"
          size="sm"
          isIconOnly
          isDisabled={isLoading}
          startContent={<RefreshIcon className="text-white" width={20} />}
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
    </Card>
  )
}

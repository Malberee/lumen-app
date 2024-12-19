import { Spinner } from '@malberee/nextui-native'
import type { FC } from 'react'
import { View } from 'react-native'
import Animated, { SlideInLeft, SlideOutLeft } from 'react-native-reanimated'

import { useWifiList } from '../model'
import { Header } from './header'
import { List } from './list'

interface WifiListProps {
  navigateToForm: () => void
}

export const WifiList: FC<WifiListProps> = ({ navigateToForm }) => {
  const { wifiList, isLoading, reScanWifiList } = useWifiList()

  return (
    <Animated.View
      entering={SlideInLeft.duration(200)}
      exiting={SlideOutLeft.duration(200)}
      className="w-[85%] flex-col gap-3 rounded-3xl border border-[#2d2d2f] bg-default-50 p-4"
    >
      <Header isLoading={isLoading} reScanWifiList={reScanWifiList} />

      <View className="h-px w-full bg-default-100" />

      <View className="h-40 flex-row items-center justify-center">
        {isLoading ? (
          <Spinner size="lg" color="white" />
        ) : (
          <List list={wifiList} onPress={navigateToForm} />
        )}
      </View>
    </Animated.View>
  )
}

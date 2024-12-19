import type { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import type { WifiEntry } from 'react-native-wifi-reborn'

import { WiFiIcon } from './wifi-icon'

interface WifiListProps {
  list: WifiEntry[]
  onPress: () => void
}

export const List: FC<WifiListProps> = ({ list, onPress }) => {
  return (
    <FlatList
      className="h-full"
      data={list}
      renderItem={({ item }) => (
        <Pressable
          onPress={onPress}
          className="w-full flex-row items-center gap-2 rounded-xl px-2 py-1 transition-colors active:bg-default-100"
        >
          <WiFiIcon className="text-foreground" />
          <Text className="text-foreground">{item.SSID}</Text>
        </Pressable>
      )}
      contentContainerStyle={{ flex: 1 }}
      ListEmptyComponent={
        <View className="h-full flex-row items-center justify-center py-4">
          <Text className="text-lg text-foreground-400">
            No Wi-Fi networks found
          </Text>
        </View>
      }
    />
  )
}

import { Link } from 'expo-router'
import type { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import type { WifiEntry } from 'react-native-wifi-reborn'

import { WiFiIcon } from '@shared/ui'

import { LockIcon } from './lock-icon'

export const NetworkItem: FC<WifiEntry> = ({ SSID, capabilities }) => {
  const isNetworkProtected =
    capabilities.includes('WEP') || capabilities.includes('WPA')

  return (
    <Link href={`/connect/${SSID}`} asChild>
      <Pressable className="flex-row items-center justify-between rounded-xl px-2 py-1 transition-colors active:bg-default-100">
        <View className="flex-row items-center gap-2">
          <WiFiIcon className="text-foreground" />
          <Text className="text-foreground">{SSID}</Text>
        </View>
        {isNetworkProtected ? (
          <LockIcon className="text-foreground" width={16} />
        ) : null}
      </Pressable>
    </Link>
  )
}

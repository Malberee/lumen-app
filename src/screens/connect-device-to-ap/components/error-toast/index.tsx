import { type FC } from 'react'
import { Text, View } from 'react-native'
import type { BaseToastProps } from 'react-native-toast-message'

import { ShieldAlertIcon } from './shield-alert-icon'

export const ErrorToast: FC<BaseToastProps> = ({ text1, text2 }) => {
  return (
    <View className="w-full px-4">
      <View className="w-full flex-row items-center gap-4 rounded-medium border border-red-500 bg-surface p-4">
        <ShieldAlertIcon className="h-8 w-8 text-red-500" />
        <View className="flex-1">
          <Text className="text-sm font-medium text-foreground">{text1}</Text>
          <Text className="text-sm text-foreground-400">{text2}</Text>
        </View>
      </View>
    </View>
  )
}

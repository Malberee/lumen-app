import type { FC } from 'react'
import { Text, View } from 'react-native'
import type { BaseToastProps } from 'react-native-toast-message'

import { DangerIcon } from './danger-icon'

export const ErrorToast: FC<BaseToastProps> = ({ text1, text2 }) => {
  return (
    <View className="w-full px-4">
      <View className="w-full flex-row items-center gap-4 rounded-medium border border-danger-100 bg-danger-50 p-4">
        <DangerIcon className="h-8 w-8 text-danger-600" />
        <View className="flex-1">
          <Text className="text-sm font-medium text-danger-600">{text1}</Text>
          <Text className="text-sm text-danger-500">{text2}</Text>
        </View>
      </View>
    </View>
  )
}

import { CloseFilledIcon } from '@malberee/nextui-native'
import type { FC } from 'react'
import { Text, View } from 'react-native'
import type { BaseToastProps } from 'react-native-toast-message'

export const ErrorToast: FC<BaseToastProps> = ({ text1, text2 }) => {
  return (
    <View className="w-full px-4">
      <View className="w-full flex-row items-center gap-4 rounded-3xl bg-danger-100 p-4">
        <CloseFilledIcon className="text-danger" width={24} height={24} />
        <View>
          <Text className="text-xl font-medium text-danger">{text1}</Text>
          <Text className="text-danger">{text2}</Text>
        </View>
      </View>
    </View>
  )
}

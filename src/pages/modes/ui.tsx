import { Canvas } from '@shopify/react-native-skia'
import { cssInterop } from 'nativewind'
import { View } from 'react-native'

import { LedRing } from '@widgets/led-ring'
import { ModeList } from '@widgets/mode-list'

cssInterop(Canvas, {
  className: 'style',
})

export const Modes = () => {
  return (
    <View className="flex h-screen w-screen items-center justify-center bg-[#09090B] p-6 dark">
      <LedRing />
      <ModeList />
    </View>
  )
}

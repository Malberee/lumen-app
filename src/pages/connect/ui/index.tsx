import MaskedView from '@react-native-masked-view/masked-view'
import { cssInterop } from 'nativewind'
import { useState } from 'react'
import { View } from 'react-native'
import Animated, { LinearTransition } from 'react-native-reanimated'

import { WifiList } from '@widgets/wifi-list'

import { ConnectToDevice } from '@features/connect-to-device'

import { GradientText } from '@shared/ui'

import { Blob } from './blob'

cssInterop(MaskedView, {
  className: 'style',
})

export const Connect = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <View className="size-full flex-col items-center justify-center gap-4">
      <Blob />
      <Animated.View layout={LinearTransition.duration(200)} className="w-full">
        <GradientText className="text-center text-3xl font-medium tracking-[20px] text-white">
          Lumen
        </GradientText>
      </Animated.View>
      <View className="w-full flex-row justify-center">
        {showForm ? (
          <ConnectToDevice />
        ) : (
          <WifiList navigateToForm={() => setShowForm(true)} />
        )}
      </View>
    </View>
  )
}

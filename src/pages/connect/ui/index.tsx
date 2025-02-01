import MaskedView from '@react-native-masked-view/masked-view'
import { Slot } from 'expo-router'
import { cssInterop } from 'nativewind'
import { KeyboardAvoidingView, View } from 'react-native'
import Animated, { LinearTransition } from 'react-native-reanimated'

import { GradientText } from '@shared/ui'

import { Blob } from './blob'

cssInterop(MaskedView, {
  className: 'style',
})

const AnimatedKeyboardAvoidingView =
  Animated.createAnimatedComponent(KeyboardAvoidingView)

export const Connect = () => {
  return (
    <View className="size-full flex-col items-center justify-center gap-4">
      <Blob />
      <Animated.View layout={LinearTransition.duration(200)} className="w-full">
        <GradientText className="text-center text-3xl font-medium tracking-[20px] text-white">
          Lumen
        </GradientText>
      </Animated.View>
      <AnimatedKeyboardAvoidingView
        layout={LinearTransition.duration(200)}
        behavior="padding"
        className="w-full flex-row justify-center"
      >
        <Slot />
      </AnimatedKeyboardAvoidingView>
    </View>
  )
}

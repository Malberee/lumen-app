import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import { cssInterop } from 'nativewind'
import type { FC, PropsWithChildren } from 'react'
import { Text, View } from 'react-native'

interface GradientTextProps extends PropsWithChildren {
  className?: string
}

cssInterop(MaskedView, {
  className: 'style',
})

export const GradientText: FC<GradientTextProps> = ({
  children,
  className,
}) => {
  return (
    <MaskedView
      className={'h-10'}
      maskElement={
        <View className="flex-1">
          <Text className={className}>{children}</Text>
        </View>
      }
    >
      <LinearGradient style={{ flex: 1 }} colors={['#ffffff', '#ffffff80']} />
    </MaskedView>
  )
}

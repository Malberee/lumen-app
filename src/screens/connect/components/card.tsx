import type { FC, PropsWithChildren, ReactNode } from 'react'
import { Text, View } from 'react-native'
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated'

interface CardProps extends PropsWithChildren {
  title: string
  action?: ReactNode
}

export const Card: FC<CardProps> = ({ title, action, children }) => {
  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutLeft}
      className="w-[85%] rounded-3xl bg-default-50 p-4"
    >
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-foreground">{title}</Text>
        {action}
      </View>
      <View className="mb-4 h-px w-full bg-default-100" />
      {children}
    </Animated.View>
  )
}

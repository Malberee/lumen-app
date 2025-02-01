import type { FC, PropsWithChildren, ReactNode } from 'react'
import { Text, View } from 'react-native'
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated'

interface ConnectionPanelProps extends PropsWithChildren {
  title: string
  endContent?: ReactNode
}

export const ConnectionPanel: FC<ConnectionPanelProps> = ({
  title,
  endContent,
  children,
}) => {
  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutLeft}
      className="w-[85%] rounded-3xl bg-default-50 p-4"
    >
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-foreground">{title}</Text>
        {endContent}
      </View>
      <View className="mb-4 h-px w-full bg-default-100" />
      {children}
    </Animated.View>
  )
}

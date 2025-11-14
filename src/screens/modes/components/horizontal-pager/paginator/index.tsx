import { type FC } from 'react'
import { View } from 'react-native'
import { type SharedValue } from 'react-native-reanimated'

import { Dot } from './dot'

interface PaginatorProps {
  length: number
  pageWidth: number
  space?: number
  dotSize?: number
  scrollX: SharedValue<number>
}

export const Paginator: FC<PaginatorProps> = ({
  length,
  pageWidth,
  scrollX,
}) => {
  return (
    <View className="flex-row justify-center gap-1">
      {Array.from({ length }).map((_, index) => (
        <Dot
          key={index}
          index={index}
          scrollX={scrollX}
          pageWidth={pageWidth}
        />
      ))}
    </View>
  )
}

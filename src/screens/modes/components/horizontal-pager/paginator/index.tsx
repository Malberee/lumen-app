import { rem } from 'nativewind'
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
  space = rem.get() / 2,
  dotSize = rem.get() / 2,
  scrollX,
}) => {
  return (
    <View className="flex-row justify-center" style={{ gap: space }}>
      {Array.from({ length }).map((_, index) => (
        <Dot
          key={index}
          index={index}
          dotSize={dotSize}
          scrollX={scrollX}
          pageWidth={pageWidth}
        />
      ))}
    </View>
  )
}

import { rem } from 'nativewind'
import { type ReactNode, useState } from 'react'
import { View } from 'react-native'

interface GridProps<T> {
  data: T[]
  numColumns?: number
  gap?: number
  renderItem: (item: T) => ReactNode
}

export const Grid = <T,>({
  data,
  numColumns = 3,
  gap = rem.get(),
  renderItem,
}: GridProps<T>) => {
  const [width, setWidth] = useState(0)

  return (
    <View
      className="flex-row flex-wrap"
      style={{ gap }}
      onLayout={({ nativeEvent }) => setWidth(nativeEvent.layout.width)}
    >
      {data.map((item, index) => (
        <View
          key={index}
          style={{ width: (width - gap * (numColumns - 1)) / numColumns }}
        >
          {renderItem(item)}
        </View>
      ))}
    </View>
  )
}

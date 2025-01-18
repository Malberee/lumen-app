import type { FC } from 'react'
import { View } from 'react-native'

interface ColorsPreviewProps {
  colors: string[]
}

export const ColorsPreview: FC<ColorsPreviewProps> = ({ colors }) => {
  return (
    <View className="size-8 flex-row overflow-hidden rounded-full">
      {colors.map((color, index) => (
        <View
          key={index}
          className="flex-1"
          style={{ backgroundColor: color }}
        />
      ))}
    </View>
  )
}

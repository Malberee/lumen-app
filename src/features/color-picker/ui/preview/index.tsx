import { View } from 'react-native'

import { useColorPicker } from '../../model'
import { Color } from './color'

export const Preview = () => {
  const { colors } = useColorPicker()

  const items = Object.keys(colors.value)

  return (
    <View className="mb-6 h-16 w-full flex-row">
      {items.map((color, index) => (
        <Color
          key={index}
          label={color}
          isFirst={index === 0}
          isLast={index === items.length - 1}
        />
      ))}
    </View>
  )
}

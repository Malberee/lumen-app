import { useState } from 'react'
import { Dimensions, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import { Mode, type ModeType } from '@entities/mode'

const modes: ModeType[] = [
  { name: 'loading', params: ['speed'], colors: ['primary', 'secondary'] },
  {
    name: 'snake',
    params: ['speed', 'length'],
    colors: ['primary', 'secondary'],
  },
  {
    name: 'double snake',
    params: ['speed', 'length'],
    colors: ['primary', 'secondary'],
  },
  {
    name: 'fill',
    params: ['speed'],
    colors: ['primary', 'secondary'],
  },
  {
    name: 'double fill',
    params: ['speed'],
    colors: ['primary', 'secondary'],
  },
  { name: 'static', params: [], colors: ['primary'] },
  { name: 'chroma', params: ['speed'], colors: [] },
  { name: 'rainbow', params: ['speed'], colors: [] },
  { name: 'custom', params: ['speed'], colors: [] },
]

const width = Dimensions.get('window').width

export const ModeList = () => {
  const [height, setHeight] = useState(0)

  return (
    <View className="flex-1 flex-row items-center">
      <Carousel
        width={Math.round(width)}
        height={Math.round(height)}
        data={modes}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
          parallaxAdjacentItemScale: 0.8,
        }}
        renderItem={({ item }) => (
          <Mode
            mode={item}
            onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
          />
        )}
      />
    </View>
  )
}

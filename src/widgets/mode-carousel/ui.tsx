import { type FC, useState } from 'react'
import { Dimensions, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import { Mode, type ModeType } from '@entities/mode'

const width = Dimensions.get('window').width

interface ModeCarouseProps {
  modes: ModeType[]
}

export const ModeCarousel: FC<ModeCarouseProps> = ({ modes }) => {
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

import { type FC, memo, useState } from 'react'
import { Dimensions, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import type { ModeType } from '@entities/mode'

import { Mode } from './mode'

const width = Dimensions.get('window').width

interface ModeCarouseProps {
  modes: ModeType[]
}

export const ModeCarousel: FC<ModeCarouseProps> = memo(({ modes }) => {
  const [height, setHeight] = useState(0)

  return (
    <View className="flex-1 flex-row items-center">
      <Carousel
        width={Math.round(width)}
        height={Math.round(height)}
        data={modes}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 50,
          parallaxAdjacentItemScale: 0.9,
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
})

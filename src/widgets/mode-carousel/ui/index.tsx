import { memo, useState } from 'react'
import { Dimensions, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { useShallow } from 'zustand/shallow'

import { selectModes, useModesContext, useModesStore } from '@entities/mode'

import { Mode } from './mode'

const width = Dimensions.get('window').width

export const ModeCarousel = memo(() => {
  const [height, setHeight] = useState(0)
  const setMode = useModesStore((state) => state.setMode)
  const modes = useModesStore(useShallow(selectModes))
  const { ref } = useModesContext()

  return (
    <View className="flex-1 flex-row items-center">
      <Carousel
        data={modes}
        ref={ref}
        width={Math.round(width)}
        height={Math.round(height)}
        windowSize={3}
        mode="parallax"
        onScrollEnd={(index) => setMode(modes[index].name)}
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

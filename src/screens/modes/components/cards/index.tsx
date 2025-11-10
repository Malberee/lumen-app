import { cssInterop, rem } from 'nativewind'
import { memo } from 'react'
import { Dimensions, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel, { Pagination } from 'react-native-reanimated-carousel'

import { selectAllModes, selectCurrentMode, useStore } from '@store'
import { modesToArray } from '@utils'

import { Mode } from './mode'

const StyledPagination = cssInterop(Pagination.Basic, {
  dotClassName: 'dotStyle',
  activeDotClassName: 'activeDotStyle',
})

export const Cards = memo(() => {
  const width = Dimensions.get('window').width

  const progress = useSharedValue(0)
  const setMode = useStore((state) => state.setMode)
  const modes = useStore(selectAllModes)
  const { name } = useStore(selectCurrentMode)

  const data = modesToArray(modes)

  return (
    <View className="flex-1 flex-row items-center">
      <View>
        <Carousel
          defaultIndex={data.findIndex((mode) => mode.name === name)}
          data={data}
          width={width}
          height={12 * rem.get() + 250} // h-48 + h-[250px]
          windowSize={5}
          mode="parallax"
          onProgressChange={progress}
          onScrollEnd={(index) => setMode(data[index].name)}
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 50,
            parallaxAdjacentItemScale: 0.9,
          }}
          renderItem={({ item }) => <Mode {...item} />}
        />
        <StyledPagination
          data={data}
          progress={progress}
          dotClassName="bg-default-100 opacity-50 rounded-full "
          activeDotClassName="rounded-full bg-default-200 "
          containerStyle={{ gap: 4, marginTop: 8 }}
        />
      </View>
    </View>
  )
})

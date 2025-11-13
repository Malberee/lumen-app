import { rem } from 'nativewind'
import { type FlatListProps, useWindowDimensions, View } from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'

import { Paginator } from './paginator'

interface HorizontalPagerProps<T> {
  data: T[]
  renderItem: FlatListProps<T>['renderItem']
}

export const HorizontalPager = <T,>({
  data,
  renderItem,
}: HorizontalPagerProps<T>) => {
  const { width } = useWindowDimensions()
  const scrollX = useSharedValue(0)
  const scrollOffset = useSharedValue(0)

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    },
    onMomentumEnd: (event) => {
      scrollOffset.value = event.contentOffset.x
    },
  })

  return (
    <View className="flex-col items-center gap-4">
      <Animated.FlatList
        data={data}
        renderItem={(props) => (
          <View style={{ width: width - rem.get() * 2 }}>
            {renderItem?.(props)}
          </View>
        )}
        centerContent
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
        snapToInterval={width - rem.get()}
        contentContainerClassName="gap-4"
        className="mb-4"
        scrollEventThrottle={16}
        onScroll={onScroll}
      />
      <Paginator
        length={data.length}
        pageWidth={width - rem.get()}
        scrollX={scrollX}
      />
    </View>
  )
}

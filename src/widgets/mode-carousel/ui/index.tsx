import { cssInterop } from 'nativewind'
import { memo, useState } from 'react'
import { Dimensions, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel, { Pagination } from 'react-native-reanimated-carousel'

import { ColorPicker } from '@features/color-picker'

import {
  selectAllModes,
  selectCurrentMode,
  useModesContext,
  useModesStore,
} from '@entities/mode'

import { Mode } from './mode'

const StyledPagination = cssInterop(Pagination.Basic, {
  dotClassName: 'dotStyle',
  activeDotClassName: 'activeDotStyle',
})

const width = Dimensions.get('window').width

export const ModeCarousel = memo(() => {
  const [height, setHeight] = useState(0)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const progress = useSharedValue(0)

  const setMode = useModesStore((state) => state.setMode)
  const modes = useModesStore(selectAllModes)
  const colors = useModesStore(selectCurrentMode).colors

  const { ref } = useModesContext()

  return (
    <View className="flex-1 flex-row items-center">
      <View>
        <Carousel
          data={modes}
          ref={ref}
          width={Math.round(width)}
          height={Math.round(height)}
          windowSize={5}
          mode="parallax"
          onProgressChange={progress}
          onScrollEnd={(index) => setMode(modes[index].name)}
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 50,
            parallaxAdjacentItemScale: 0.9,
          }}
          renderItem={({ item }) => (
            <Mode
              mode={item}
              showColorPicker={() => setShowColorPicker(true)}
              onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
            />
          )}
        />
        <StyledPagination
          data={modes}
          progress={progress}
          dotClassName="bg-default-100 opacity-50 rounded-full "
          activeDotClassName="rounded-full bg-default-200 "
          containerStyle={{ gap: 4, marginTop: 8 }}
        />
      </View>

      {showColorPicker ? (
        <ColorPicker
          onClose={() => setShowColorPicker(false)}
          colors={colors}
        />
      ) : null}
    </View>
  )
})

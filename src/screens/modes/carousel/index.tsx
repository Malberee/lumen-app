import { cssInterop, rem } from 'nativewind'
import { memo, useState } from 'react'
import { Dimensions, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel, { Pagination } from 'react-native-reanimated-carousel'

import { useModesContext } from '@providers'
import { selectAllModes, selectCurrentMode, useModesStore } from '@store'
import { modesToArray } from '@utils'

import { ColorPickerProvider } from './color-picker/provider'
import { Mode } from './mode'

const StyledPagination = cssInterop(Pagination.Basic, {
  dotClassName: 'dotStyle',
  activeDotClassName: 'activeDotStyle',
})

export const ModeCarousel = memo(() => {
  const width = Dimensions.get('window').width
  const [showColorPicker, setShowColorPicker] = useState(false)
  const progress = useSharedValue(0)

  const setMode = useModesStore((state) => state.setMode)
  const modes = useModesStore(selectAllModes)
  const { colors, name } = useModesStore(selectCurrentMode)

  const { ref } = useModesContext()

  const data = modesToArray(modes)

  return (
    <View className="flex-1 flex-row items-center">
      <View>
        <Carousel
          defaultIndex={data.findIndex((mode) => mode.name === name)}
          data={data}
          ref={ref}
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
          renderItem={({ item }) => (
            <Mode
              mode={item}
              showColorPicker={() => setShowColorPicker(true)}
            />
          )}
        />
        <StyledPagination
          data={data}
          progress={progress}
          dotClassName="bg-default-100 opacity-50 rounded-full "
          activeDotClassName="rounded-full bg-default-200 "
          containerStyle={{ gap: 4, marginTop: 8 }}
        />
      </View>

      {showColorPicker ? (
        <ColorPickerProvider
          onClose={() => setShowColorPicker(false)}
          colors={colors}
        />
      ) : null}
    </View>
  )
})

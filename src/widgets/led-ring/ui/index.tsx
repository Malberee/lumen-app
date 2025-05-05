import {
  BackdropBlur,
  Blur,
  Canvas,
  Circle,
  Group,
} from '@shopify/react-native-skia'
import { cssInterop } from 'nativewind'
import { Dimensions, View } from 'react-native'

import { Led } from './led'
import { useLedRing } from './model'

cssInterop(Canvas, {
  className: 'style',
})

const StyledCircle = cssInterop(Circle, {
  className: {
    target: false,
    nativeStyleToProp: {
      backgroundColor: 'color',
    },
  },
})

export const LedRing = () => {
  const { width, height } = Dimensions.get('window')
  const leds = useLedRing(24)

  return (
    <View className="absolute h-screen w-screen flex-row items-center justify-center">
      <Canvas className="size-full">
        <Group transform={[{ translateY: height / 4 }]}>
          <StyledCircle
            cx={width / 2}
            cy={width / 2}
            r={width / 3}
            style="stroke"
            className="bg-default-900"
            strokeWidth={24}
          />
          {leds.value.map((_, index) => (
            <Led key={index} index={index} colors={leds} parentWidth={width} />
          ))}
          <BackdropBlur blur={70} />
          <Blur blur={4} />
        </Group>
      </Canvas>
    </View>
  )
}

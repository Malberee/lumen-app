import {
  BackdropBlur,
  Blur,
  Canvas,
  Circle,
  Group,
} from '@shopify/react-native-skia'
import { cssInterop } from 'nativewind'
import { type FC, useState } from 'react'
import { View } from 'react-native'
import type { SharedValue } from 'react-native-reanimated'

import { Led } from './led'
import { useLedRing } from './model'

interface LedRingProps {
  shouldAnimate: SharedValue<boolean>
}

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

export const LedRing: FC<LedRingProps> = ({ shouldAnimate }) => {
  const [size, setSize] = useState({ width: 0, height: 0 })
  const { leds, colors } = useLedRing(24, shouldAnimate)

  return (
    <View className="absolute h-screen w-screen flex-row items-center justify-center">
      <Canvas
        className="size-full"
        onLayout={(e) =>
          setSize({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
          })
        }
      >
        <Group transform={[{ translateY: size.height / 4 }]}>
          <StyledCircle
            cx={size.width / 2}
            cy={size.width / 2}
            r={size.width / 3}
            style="stroke"
            className="bg-default-900"
            strokeWidth={24}
          />
          {leds.map((_, index) => (
            <Led
              key={index}
              index={index}
              colors={colors}
              parentWidth={size.width}
            />
          ))}
          <BackdropBlur blur={70} />
          <Blur blur={4} />
        </Group>
      </Canvas>
    </View>
  )
}

import {
  BackdropBlur,
  Blur,
  Canvas,
  Circle,
  Group,
} from '@shopify/react-native-skia'
import { cssInterop } from 'nativewind'
import { useEffect } from 'react'
import { Dimensions, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

import { selectCurrentMode, selectPower, useStore } from '@store'

import { modes } from './helpers'
import { Led } from './led'

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
  const ledsCount = 24

  const { name, colors, length, speed } = useStore(selectCurrentMode)
  const power = useStore(selectPower)

  const modeName = name as keyof typeof modes

  const leds = useSharedValue<string[]>(
    modes[modeName].initial(ledsCount, colors, length),
  )

  useEffect(() => {
    if (power) {
      leds.value = modes[modeName].initial(ledsCount, colors, length)

      if (modeName !== 'solid') {
        const interval = setInterval(() => {
          if (power) {
            leds.value = modes[modeName].progress(leds.value, colors)
          }
        }, speed)

        return () => {
          clearInterval(interval)
        }
      }
    } else {
      leds.value = leds.value.map(() => '#000000')
    }
  }, [colors, speed, length, name, power])

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

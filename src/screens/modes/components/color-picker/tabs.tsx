import { Pressable, Text } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import { selectCurrentMode, useStore } from '@store'

import { Surface } from '../surface'
import { ANIMATION_DURATION, DROP_SHADOW } from './constants'
import { useColorPicker } from './hooks'

export const Tabs = () => {
  const { selectedColor, selectColor } = useColorPicker()
  const { colors } = useStore(selectCurrentMode)

  const colorNames = ['primary', 'secondary']

  return (
    <Surface
      as={Animated.View}
      className="flex-row rounded-full"
      style={{ filter: DROP_SHADOW }}
      entering={FadeIn.delay(ANIMATION_DURATION)}
      exiting={FadeOut}
    >
      <Animated.View
        className="absolute left-4 top-4 h-full w-1/2 rounded-full bg-primary"
        style={{
          transform: [{ translateX: `${selectedColor * 100}%` }],
          transitionProperty: 'transform',
          transitionDuration: ANIMATION_DURATION / 2,
        }}
      />
      {colors.map((_, index) => (
        <Pressable
          key={colorNames[index]}
          className="h-16 flex-1"
          onPress={() => selectColor(index)}
        >
          <Text className="my-auto text-center text-lg capitalize text-foreground">
            {colorNames[index]}
          </Text>
        </Pressable>
      ))}
    </Surface>
  )
}

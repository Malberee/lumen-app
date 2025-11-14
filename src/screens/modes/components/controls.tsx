import { Slider, type SliderProps } from 'merlo-ui'
import type { FC } from 'react'
import { Text, View } from 'react-native'
import type { SvgProps } from 'react-native-svg'

import { LEDS_COUNT } from '@constants'
import { selectCurrentMode, useStore } from '@store'

import { GaugeIcon, RulerIcon } from './icons'
import { Surface } from './surface'

export const Controls = () => {
  const updateParams = useStore((state) => state.updateParams)
  const currentMode = useStore(selectCurrentMode)

  const renderLabel = (Icon: FC<SvgProps>): SliderProps['renderLabel'] => {
    return ({ children, ...props }) => (
      <View className="flex-row items-center gap-1">
        <Icon className="text-foreground" />
        <Text {...props}>{children}</Text>
      </View>
    )
  }

  return (
    <Surface className="gap-4">
      {'speed' in currentMode ? (
        <Slider
          size="sm"
          label="Speed"
          maxValue={LEDS_COUNT * 2}
          minValue={1}
          getValue={(value) => `${value} FPS`}
          renderLabel={renderLabel(GaugeIcon)}
          onChangeEnd={(value) =>
            updateParams({ param: 'speed', value: value as number })
          }
        />
      ) : null}
      {'length' in currentMode ? (
        <Slider
          size="sm"
          label="Length"
          maxValue={LEDS_COUNT / 2}
          getValue={(value) => `${value} LEDs`}
          renderLabel={renderLabel(RulerIcon)}
          onChangeEnd={(value) =>
            updateParams({ param: 'length', value: value as number })
          }
        />
      ) : null}

      {!('speed' in currentMode) && !('length' in currentMode) ? (
        <Text className="text-center text-lg text-foreground-300">
          There are no parameters for this mode
        </Text>
      ) : null}
    </Surface>
  )
}

import { type SliderProps } from 'merlo-ui'
import type { FC } from 'react'
import { Text, View } from 'react-native'
import type { SvgProps } from 'react-native-svg'

import { Surface } from '@components'
import { LEDS_COUNT } from '@constants'
import { selectCurrentMode, useStore } from '@store'

import { SPEED_VALUES } from '../../constants'
import { GaugeIcon, RulerIcon } from '../icons'
import { ControlledSlider } from './controlled-slider'

export const Controls = () => {
  const setParams = useStore((state) => state.setParams)
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
        <ControlledSlider
          size="sm"
          label="Speed"
          defaultValue={currentMode.speed}
          maxValue={SPEED_VALUES.length}
          minValue={1}
          renderLabel={renderLabel(GaugeIcon)}
          onChangeEnd={(value) => setParams('speed', value as number)}
        />
      ) : null}
      {'length' in currentMode ? (
        <ControlledSlider
          size="sm"
          label="Length"
          defaultValue={currentMode.length}
          maxValue={LEDS_COUNT / 2}
          minValue={1}
          getValue={(value) => `${value} LEDs`}
          renderLabel={renderLabel(RulerIcon)}
          onChangeEnd={(value) => setParams('length', value as number)}
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

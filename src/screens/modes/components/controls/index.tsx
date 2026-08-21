import { type SliderProps } from 'merlo-ui'
import type { FC } from 'react'
import { Text, View } from 'react-native'
import type { SvgProps } from 'react-native-svg'

import { Surface } from '@components'
import { LEDS_COUNT, type ModeSetting, modeSettingKeys } from '@constants'
import { selectCurrentMode, useStore } from '@store'

import { GaugeIcon, RulerIcon } from '../icons'
import { ControlledSlider } from './controlled-slider'

type RenderControlledSliderProps = {
  type: ModeSetting
  maxValue?: number
  icon: FC<SvgProps>
  getValue?: SliderProps['getValue']
}

export const Controls = () => {
  const setSetting = useStore((state) => state.setSetting)
  const currentMode = useStore(selectCurrentMode)

  const renderLabel = (Icon: FC<SvgProps>): SliderProps['renderLabel'] => {
    return ({ children, ...props }) => (
      <View className="flex-row items-center gap-1">
        <Icon className="text-foreground" />
        <Text {...props}>{children}</Text>
      </View>
    )
  }

  const renderControlledSlider = ({
    type,
    maxValue,
    icon,
    getValue,
  }: RenderControlledSliderProps) => {
    return (
      <ControlledSlider
        size="sm"
        label={type}
        defaultValue={currentMode[type]}
        maxValue={maxValue}
        minValue={1}
        renderLabel={renderLabel(icon)}
        classNames={{ label: 'capitalize' }}
        getValue={getValue}
        onChangeEnd={(value) => setSetting(type, value as number)}
      />
    )
  }

  const hasSettings =
    modeSettingKeys.speed in currentMode ||
    modeSettingKeys.length in currentMode

  return (
    <Surface className="gap-4">
      {modeSettingKeys.speed in currentMode &&
        renderControlledSlider({
          type: modeSettingKeys.speed,
          icon: GaugeIcon,
        })}
      {modeSettingKeys.length in currentMode &&
        renderControlledSlider({
          type: modeSettingKeys.length,
          maxValue: LEDS_COUNT / 2,
          icon: RulerIcon,
          getValue: (value) => `${value} LEDs`,
        })}

      {!hasSettings ? (
        <Text className="text-center text-lg text-foreground-300">
          There are no parameters for this mode
        </Text>
      ) : null}
    </Surface>
  )
}

import { Button, Chip, Slider } from '@malberee/heroui-native'
import { type FC } from 'react'
import { View } from 'react-native'

import { type ModeType, useModesStore } from '@entities/mode'

import { GradientText } from '@shared/ui'

import { BubbleIcon } from '../bubble-icon'
import { ColorsPreview } from './colors-preview'

interface ModeProps {
  mode: ModeType
  showColorPicker: () => void
}

export const Mode: FC<ModeProps> = ({ mode, showColorPicker }) => {
  const updateParams = useModesStore((state) => state.updateParams)

  return (
    <View className="w-full flex-row justify-center">
      <View className="w-[90%]">
        <View className="h-48 flex-col justify-center rounded-t-3xl border border-[#27272A] bg-[#3F3F46]/30">
          <GradientText className="text-center text-4xl font-medium capitalize">
            {mode.name}
          </GradientText>
        </View>

        <View className="h-[250px] w-full flex-col gap-6 rounded-b-3xl border-x border-b border-[#2d2d2f] bg-default-50 p-4">
          <View className="flex-row items-center justify-between">
            <Chip size="lg" color="success" variant="flat">
              Active
            </Chip>

            <ColorsPreview colors={Object.values(mode.colors)} />
          </View>

          <View className="flex-1 flex-col justify-between">
            <View className="flex-col justify-between gap-4">
              {'speed' in mode ? (
                <Slider
                  defaultValue={mode.speed}
                  label="Speed"
                  step={50}
                  minValue={100}
                  maxValue={1000}
                  getValue={(value) => `${value}ms`}
                  classNames={{ thumb: 'bg-default-50' }}
                  onChangeEnd={(value) =>
                    updateParams({ param: 'speed', value: value as number })
                  }
                />
              ) : null}
              {'length' in mode ? (
                <Slider
                  defaultValue={mode.length}
                  label="Length"
                  minValue={1}
                  maxValue={12}
                  getValue={(value) => `${value} leds`}
                  classNames={{ thumb: 'bg-default-50' }}
                  onChangeEnd={(value) =>
                    updateParams({ param: 'length', value: value as number })
                  }
                />
              ) : null}
            </View>

            <Button
              size="lg"
              radius="sm"
              variant="solid"
              isDisabled={Object.keys(mode.colors).length === 0}
              startContent={<BubbleIcon />}
              onPress={showColorPicker}
            >
              Select color
            </Button>
          </View>
        </View>
      </View>
    </View>
  )
}

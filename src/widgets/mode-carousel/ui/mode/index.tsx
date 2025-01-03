import { Button, Chip, Slider } from '@malberee/nextui-native'
import { type FC, useState } from 'react'
import { type LayoutChangeEvent, View } from 'react-native'

import { ColorPicker } from '@features/color-picker'

import { type ModeType, useModesStore } from '@entities/mode'

import { GradientText } from '@shared/ui'

import { BubbleIcon } from '../bubble-icon'
import { ColorsPreview } from './colors-preview'

interface ModeProps {
  mode: ModeType
  onLayout: (e: LayoutChangeEvent) => void
}

export const Mode: FC<ModeProps> = ({ mode, onLayout }) => {
  const [isOpen, setIsOpen] = useState(false)

  const modes = useModesStore((state) => state.modes)
  const colors = modes[mode.name.replace(/ /g, '-')].colors

  return (
    <View className="w-full flex-row justify-center">
      <View className="w-[90%]" onLayout={onLayout}>
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

            <View className="size-8 rounded-full bg-[#00A3FF]" />
            <ColorsPreview colors={Object.values(colors)} />
          </View>

          <View className="flex-1 flex-col justify-between">
            <Slider
              defaultValue={mode.params.speed}
              label="Speed"
              step={50}
              minValue={100}
              maxValue={1000}
              getValue={(value) => `${value}ms`}
              classNames={{ thumb: 'bg-default-50' }}
            />
            {'length' in mode.params ? (
              <Slider
                defaultValue={mode.params.length}
                label="Length"
                maxValue={10}
                getValue={(value) => `${value} leds`}
                classNames={{ thumb: 'bg-default-50' }}
              />
            ) : null}
            <Button
              size="lg"
              radius="sm"
              variant="solid"
              startContent={<BubbleIcon />}
              onPress={() => setIsOpen(true)}
            >
              Select color
            </Button>
          </View>
        </View>

        {isOpen ? (
          <ColorPicker colors={colors} onClose={() => setIsOpen(false)} />
        ) : null}
      </View>
    </View>
  )
}

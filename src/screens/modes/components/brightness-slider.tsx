import { Slider } from 'merlo-ui'
import { useState } from 'react'
import { Text, View } from 'react-native'

import { useStore } from '@store'

export const BrightnessSlider = () => {
  const setBrightness = useStore((state) => state.setBrightness)
  const brightness = useStore((state) => state.brightness)
  const [value, setValue] = useState(brightness)

  return (
    <View className="flex-col gap-4">
      <Text className="text-center text-xl text-foreground">{value}%</Text>
      <Slider
        orientation="vertical"
        size="lg"
        hideValue
        minValue={1}
        classNames={{
          base: 'h-96',
          label: 'text-xl',
          track: 'w-12 border-y-[1.5rem]',
          thumbWrapper: 'size-12',
          thumb: 'size-10',
          thumbHitbox: 'size-20',
        }}
        defaultValue={brightness}
        onChange={(value) => setValue(value as number)}
        onChangeEnd={(value) => setBrightness(value as number)}
      />
      <Text className="text-center text-xl text-foreground">Brightness</Text>
    </View>
  )
}

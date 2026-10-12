import { router } from 'expo-router'
import { Button } from 'merlo-ui'
import { useState } from 'react'
import { Text, View } from 'react-native'

import { routes } from '@constants'
import { controllerClient } from '@services'
import { useStore } from '@store'

import { NumberPicker } from './components'
import { debounce } from './utils'

export const LEDCountSetup = () => {
  const [value, setValue] = useState(1)
  const setLedCount = useStore((state) => state.setLedCount)

  const handleValueChange = (ledCount: number) => {
    setValue(ledCount)
    controllerClient.setMode({
      name: 'led count setup',
      colors: [],
      length: ledCount,
    })
  }

  const handleContinue = () => {
    setLedCount(value)
    router.replace(routes.connectDeviceToAp)
  }

  return (
    <View className="relative flex-1">
      <View className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Text className="absolute -top-5 -translate-y-full text-center text-sm text-foreground-400">
          Hold the button to change the value faster
        </Text>
        <NumberPicker onValueChange={debounce(handleValueChange, 500)} />
        <Text className="absolute -bottom-10 left-1/2 w-72 -translate-x-1/2 translate-y-full text-center text-large text-foreground">
          Adjust the number of LEDs until the red one reaches the end
        </Text>
      </View>
      <Button size="lg" className="mb-4 mt-auto" onPress={handleContinue}>
        Continue
      </Button>
    </View>
  )
}

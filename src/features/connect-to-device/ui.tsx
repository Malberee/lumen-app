import { Button, CloseIcon, Input } from '@malberee/nextui-native'
import { Text, View } from 'react-native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'

export const ConnectToDevice = () => {
  return (
    <Animated.View
      entering={SlideInRight.duration(200)}
      exiting={SlideOutRight.duration(200)}
      className="w-[85%] flex-col gap-4 rounded-3xl border border-[#2d2d2f] bg-default-50 p-4"
    >
      <View className="flex-row items-center justify-between gap-4">
        <Text className="text-lg text-foreground">
          Access point credentials
        </Text>
        <Button
          variant="light"
          color="default"
          size="sm"
          radius="sm"
          isIconOnly
          startContent={<CloseIcon className="text-foreground" />}
        />
      </View>

      <View className="h-px w-full bg-default-100" />

      <Input label="SSID" labelPlacement="inside" />
      <Input label="SSID" labelPlacement="inside" />
      <Button size="lg" radius="sm">
        Submit
      </Button>
    </Animated.View>
  )
}

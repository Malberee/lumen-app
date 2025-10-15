import { Portal } from '@gorhom/portal'
import { Button } from 'merlo-ui'
import type { FC } from 'react'
import { Pressable, Text } from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated'

interface DialogProps {
  onSubmit: () => void
  onClose: () => void
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export const Dialog: FC<DialogProps> = ({ onClose, onSubmit }) => {
  return (
    <Portal>
      <AnimatedPressable
        entering={FadeIn.duration(100)}
        exiting={FadeOut.duration(100)}
        onPress={onClose}
        className="absolute left-0 top-0 z-10 size-full flex-row items-center justify-center bg-black/50"
      >
        <Animated.View
          entering={ZoomIn.duration(100)}
          exiting={ZoomOut.duration(100)}
          onStartShouldSetResponder={() => true}
          onTouchEnd={(e) => e.stopPropagation()}
          className="rounded-3xl bg-default-100 p-4"
        >
          <Text className="mb-4 text-lg text-foreground">
            Are you sure you want to disconnect?
          </Text>
          <Button
            size="lg"
            variant="flat"
            color="default"
            className="mb-2"
            onPress={onClose}
          >
            Cancel
          </Button>
          <Button size="lg" color="danger" onPress={onSubmit}>
            Disconnect
          </Button>
        </Animated.View>
      </AnimatedPressable>
    </Portal>
  )
}

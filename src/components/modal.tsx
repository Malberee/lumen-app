import { Portal } from '@gorhom/portal'
import { Button, CloseIcon } from 'merlo-ui'
import { useEffect, type FC, type PropsWithChildren } from 'react'
import { BackHandler, Dimensions, Pressable, View } from 'react-native'
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOutDown,
} from 'react-native-reanimated'

interface ModalProps extends PropsWithChildren {
  transparent?: boolean
  onClose?: () => void
}

const ANIMATION_DURATION = 200

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export const Modal: FC<ModalProps> = ({ children, transparent, onClose }) => {
  const { width, height } = Dimensions.get('screen')

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onClose?.()
        return true
      },
    )

    return () => backHandler.remove()
  }, [])

  return (
    <Portal>
      <View
        className="absolute left-0 top-0 z-50 flex-row items-center justify-center"
        style={{ width, height }}
      >
        <AnimatedPressable
          className="absolute left-0 top-0 size-full"
          style={{
            backgroundColor: transparent ? 'transparent' : 'rgba(0, 0, 0, 0.5)',
          }}
          onPress={onClose}
          entering={FadeIn.duration(ANIMATION_DURATION)}
          exiting={FadeOutDown.duration(ANIMATION_DURATION)}
        />
        <Animated.View
          className="rounded-3xl border border-default-100 bg-default-50 p-4"
          entering={FadeInDown.duration(ANIMATION_DURATION)}
          exiting={FadeOutDown.duration(ANIMATION_DURATION)}
        >
          <Button
            isIconOnly
            color="default"
            variant="light"
            className="ml-auto mr-0"
            startContent={<CloseIcon className="text-foreground" />}
            onPress={onClose}
          />
          {children}
        </Animated.View>
      </View>
    </Portal>
  )
}

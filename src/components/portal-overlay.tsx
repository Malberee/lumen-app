import { Portal } from '@gorhom/portal'
import { useEffect, type FC, type PropsWithChildren } from 'react'
import { BackHandler, Dimensions, Pressable, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

export interface PortalOverlayProps extends PropsWithChildren {
  transparent?: boolean
  onClose?: () => void
}

const ANIMATION_DURATION = 200

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export const PortalOverlay: FC<PortalOverlayProps> = ({
  transparent,
  children,
  onClose,
}) => {
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
          exiting={FadeOut.duration(ANIMATION_DURATION)}
        />
        {children}
      </View>
    </Portal>
  )
}

import { Portal } from '@gorhom/portal'
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated'

import { CheckIcon } from './check-icon'

export const SuccessOverlay = () => {
  return (
    <Portal>
      <Animated.View
        entering={FadeIn}
        className="absolute top-0 h-full w-screen flex-row items-center justify-center bg-success/20"
      >
        <Animated.View entering={ZoomIn}>
          <CheckIcon className="text-success" width={200} height={200} />
        </Animated.View>
      </Animated.View>
    </Portal>
  )
}

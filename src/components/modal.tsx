import { Button, CloseIcon } from 'merlo-ui'
import { type FC } from 'react'
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated'

import { PortalOverlay, type PortalOverlayProps } from './portal-overlay'
import { Surface } from './surface'

const ANIMATION_DURATION = 200

export const Modal: FC<PortalOverlayProps> = ({
  children,
  transparent,
  onClose,
}) => {
  return (
    <PortalOverlay transparent={transparent} onClose={onClose}>
      <Surface
        as={Animated.View}
        className="rounded-3xl"
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
      </Surface>
    </PortalOverlay>
  )
}

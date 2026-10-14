import { Button } from 'merlo-ui'
import { memo, useState } from 'react'
import { View } from 'react-native'

import { PortalOverlay } from '@components'
import { controllerClient } from '@services'
import { useStore } from '@store'

import { BrightnessSlider } from '../brightness-slider'
import { LogoutIcon, SunIcon } from '../icons'
import { Dialog } from './dialog'
import { Toggle } from './toggle'

export const Header = memo(() => {
  const [showDialog, setShowDialog] = useState(false)
  const [showBrightnessPicker, setShowBrightnessPicker] = useState(false)
  const setPower = useStore((state) => state.setPower)
  const power = useStore((state) => state.power)

  return (
    <View className="absolute z-10 w-full flex-row justify-between pt-4">
      <Button
        color="default"
        variant="flat"
        size="lg"
        isIconOnly
        startContent={
          <LogoutIcon
            className="text-default-foreground"
            width={20}
            height={20}
          />
        }
        onPress={() => setShowDialog(true)}
      />
      <View className="flex-row gap-4">
        <Button
          color="default"
          variant="flat"
          size="lg"
          isIconOnly
          startContent={
            <SunIcon
              className="text-default-foreground"
              width={20}
              height={20}
            />
          }
          onPress={() => setShowBrightnessPicker(true)}
        />
        <Toggle value={power} onValueChange={setPower} />
      </View>

      {showBrightnessPicker ? (
        <PortalOverlay onClose={() => setShowBrightnessPicker(false)}>
          <BrightnessSlider />
        </PortalOverlay>
      ) : null}

      {showDialog ? (
        <Dialog
          onClose={() => setShowDialog(false)}
          onSubmit={() => controllerClient.disconnect()}
        />
      ) : null}
    </View>
  )
})

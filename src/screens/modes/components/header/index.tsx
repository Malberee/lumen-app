import { router } from 'expo-router'
import { Button } from 'merlo-ui'
import { memo, useState } from 'react'
import { View } from 'react-native'

import { UDP } from '@services'
import { useStore } from '@store'

import { LogoutIcon } from '../icons'
import { Dialog } from './dialog'
import { Toggle } from './toggle'

export const Header = memo(() => {
  const [showDialog, setShowDialog] = useState(false)
  const setPower = useStore((state) => state.setPower)
  const power = useStore((state) => state.power)

  const handleSubmit = async () => {
    await UDP.sendMessage('DSCNT')
    UDP.resetIP()
    router.replace('/')
  }

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
      <Toggle value={power} onValueChange={setPower} />

      {showDialog ? (
        <Dialog onClose={() => setShowDialog(false)} onSubmit={handleSubmit} />
      ) : null}
    </View>
  )
})

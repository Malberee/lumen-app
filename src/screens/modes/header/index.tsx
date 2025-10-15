import { Button, Switch } from '@malberee/heroui-native'
import { router } from 'expo-router'
import { useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { UDP } from '@services'
import { useModesStore } from '@store'

import { Dialog } from './dialog'
import { LogoutIcon } from './logout-icon'

export const Header = () => {
  const { top } = useSafeAreaInsets()
  const [showDialog, setShowDialog] = useState(false)
  const setPower = useModesStore((state) => state.setPower)

  const disconnect = async () => {
    await UDP.sendMessage('DSCNT')
    await UDP.close()
    UDP.setIP('192.168.4.1')
    router.replace('/connect')
  }

  return (
    <View
      className="absolute z-10 w-full flex-row justify-between p-4"
      style={{ top }}
    >
      <Button
        onPress={() => setShowDialog(true)}
        color="danger"
        variant="flat"
        startContent={<LogoutIcon className="text-danger" />}
        isIconOnly
      />

      <Switch
        size="md"
        onValueChange={setPower}
        defaultSelected
        aria-label="Toggle power"
      />

      {showDialog ? (
        <Dialog onClose={() => setShowDialog(false)} onSubmit={disconnect} />
      ) : null}
    </View>
  )
}

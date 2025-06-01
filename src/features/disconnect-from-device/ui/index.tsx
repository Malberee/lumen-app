import { Button } from '@malberee/heroui-native'
import React from 'react'

import { Dialog } from './dialog'
import { LogoutIcon } from './logout-icon'
import { useDisconnectFromDevice } from './model'

export const DisconnectFromDevice = () => {
  const { open, close, disconnect, isShow } = useDisconnectFromDevice()

  return (
    <>
      <Button
        onPress={open}
        color="danger"
        variant="flat"
        startContent={<LogoutIcon className="text-danger" />}
        isIconOnly
      />
      {isShow ? <Dialog onSubmit={disconnect} onClose={close} /> : null}
    </>
  )
}

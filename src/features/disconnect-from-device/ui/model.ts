import { router } from 'expo-router'
import { useState } from 'react'

import { UDP } from '@shared/api'

export const useDisconnectFromDevice = () => {
  const [isShow, setIsShow] = useState(false)

  const disconnect = async () => {
    await UDP.sendMessage('DSCNT')
    await UDP.close()
    UDP.setIP('192.168.4.1')
    router.replace('/connect')
  }

  return {
    isShow,
    open: () => setIsShow(true),
    close: () => setIsShow(false),
    disconnect,
  }
}

import { useSyncExternalStore } from 'react'

import { controllerClient } from '@services'

export const useConnectionState = () => {
  return useSyncExternalStore(
    controllerClient.subscribeToConnectionState,
    controllerClient.getConnectionState,
  )
}

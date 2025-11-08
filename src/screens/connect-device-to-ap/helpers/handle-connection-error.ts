import type { Dispatch } from 'react'
import Toast from 'react-native-toast-message'

import type { Action } from '../hooks'

export const handleConnectionError = (
  error: string,
  dispatch: Dispatch<Action>,
) => {
  switch (error) {
    case 'NetworkNotFound':
      dispatch({ field: 'ssid', error: 'Network not found!' })
      break
    case 'WrongPassword':
      dispatch({ field: 'password', error: 'Wrong password!' })
      break
    case 'ConnectFailed':
      Toast.show({ type: 'error', text1: 'Connect failed!' })
      break
    case 'Timeout':
      Toast.show({
        type: 'error',
        text1: 'Connect failed!',
        text2:
          'It appears there is no connection with the device. Please try again.',
      })
      break
    default:
      Toast.show({ type: 'error', text1: 'Unknown error' })
      break
  }
}

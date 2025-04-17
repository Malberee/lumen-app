import { router } from 'expo-router'
import { useReducer, useState } from 'react'
import Toast from 'react-native-toast-message'

import { objToString } from '@shared/lib'

import { sendCredentials } from './api'

type Fields = {
  ssid: string
  password: string
}

type State = {
  values: Fields
  errors: Fields
}

type Action = {
  field: keyof Fields
  value?: string
  error?: string
}

const reducer = (state: State, action: Action): State => {
  return {
    ...state,
    values: {
      ...state.values,
      [action.field]: action.value ?? state.values[action.field],
    },
    errors: {
      ...state.errors,
      [action.field]: action.error ?? state.errors[action.field],
    },
  }
}

export const useConnectDeviceToAP = (onSuccess: () => void) => {
  const [state, dispatch] = useReducer(reducer, {
    values: { ssid: '', password: '' },
    errors: { ssid: '', password: '' },
  })
  const [isLoading, setIsLoading] = useState(false)

  const onError = (error: string) => {
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
      default:
        Toast.show({ type: 'error', text1: 'Unknown error' })
        break
    }
  }

  const onSubmit = async () => {
    const { ssid, password } = state.values

    if (!ssid.trim()) dispatch({ field: 'ssid', error: 'SSID is required!' })
    if (!password.trim())
      dispatch({ field: 'password', error: 'Password is required!' })
    if (!ssid.trim() || !password.trim()) return

    dispatch({ field: 'ssid', error: '' })
    dispatch({ field: 'password', error: '' })

    try {
      setIsLoading(true)
      await sendCredentials(`CRD ${objToString(state.values)}`)
      onSuccess()
      setTimeout(() => {
        router.navigate('/modes')
      }, 500)
    } catch (error) {
      let errorMessage = 'Error'
      if (error instanceof Error) errorMessage = error.message
      onError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return { state, isLoading, dispatch, onSubmit }
}

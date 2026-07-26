import { Link, router } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'

import { controllerClient } from '@services'

import { ConnectingLoader, ErrorToast, Form } from './components'
import { useCurrentSSID } from './hooks'

export const ConnectDeviceToAP = () => {
  const currentSSID = useCurrentSSID()

  const [isDeviceConnected, setIsDeviceConnected] = useState(false)
  const [network, setNetwork] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)

  const handleSuccess = (networkName: string) => {
    setNetwork(networkName)
    setIsDeviceConnected(true)
  }

  const connectToController = useCallback(async () => {
    try {
      await controllerClient.connect()
      router.replace('/modes')
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    if (network === currentSSID) {
      connectToController()
    }
  }, [currentSSID])

  return (
    <>
      {isDeviceConnected ? (
        <ConnectingLoader network={network} />
      ) : (
        <>
          <Form onSuccess={handleSuccess} onLoading={setIsConnecting} />
          <Link
            href="/modes"
            replace
            disabled={isConnecting}
            className={`mb-4 text-center text-primary underline transition-opacity ${isConnecting && 'opacity-50'}`}
          >
            I want to stay connected to the device's access point.
          </Link>
        </>
      )}

      <Toast
        config={{ error: (props) => <ErrorToast {...props} /> }}
        position="bottom"
        visibilityTime={10_000}
        autoHide
      />
    </>
  )
}

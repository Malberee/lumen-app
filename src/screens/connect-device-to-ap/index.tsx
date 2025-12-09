import { useNetInfo } from '@react-native-community/netinfo'
import { Link, router } from 'expo-router'
import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'

import { UDP } from '@services'

import { ConnectingLoader, ErrorToast, Form } from './components'

export const ConnectDeviceToAP = () => {
  const { details, type, isConnected } = useNetInfo()

  const [isDeviceConnected, setIsDeviceConnected] = useState(false)
  const [network, setNetwork] = useState('')

  const handleSuccess = (espIP: string, network: string) => {
    UDP.setIP(espIP)
    setNetwork(network)
    setIsDeviceConnected(true)
  }

  useEffect(() => {
    if (type === 'wifi' && network === details.ssid) {
      router.replace('/modes')
    }
  }, [isConnected, details])

  return (
    <>
      {isDeviceConnected ? (
        <ConnectingLoader network={network} />
      ) : (
        <>
          <Form onSuccess={handleSuccess} />
          <Link href="/modes" replace className="mb-4 text-primary underline">
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

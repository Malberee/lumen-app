import { Link, router } from 'expo-router'
import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'

import { routes } from '@constants'
import { useConnectionState } from '@hooks'
import { ConnectionStatus, controllerClient } from '@services'

import { ConnectingLoader, ErrorToast, Form } from './components'
import { useCurrentSSID } from './hooks'

export const ConnectDeviceToAP = () => {
  const currentSSID = useCurrentSSID()
  const connectionState = useConnectionState()

  const [
    controllerNetworkConnectionStatus,
    setControllerNetworkConnectionStatus,
  ] = useState(ConnectionStatus.DISCONNECTED)
  const [targetNetwork, setTargetNetwork] = useState<string | null>(null)

  const isControllerConnectedToNetwork =
    controllerNetworkConnectionStatus === ConnectionStatus.CONNECTED

  const handleSuccess = (network: string) => {
    setControllerNetworkConnectionStatus(ConnectionStatus.CONNECTED)
    setTargetNetwork(network)
  }

  useEffect(() => {
    if (
      targetNetwork &&
      targetNetwork === currentSSID &&
      isControllerConnectedToNetwork
    ) {
      controllerClient.connect()
    }
  }, [targetNetwork, currentSSID, isControllerConnectedToNetwork])

  useEffect(() => {
    if (
      isControllerConnectedToNetwork &&
      connectionState.status === ConnectionStatus.CONNECTED
    ) {
      router.replace(routes.modes)
    }
  }, [isControllerConnectedToNetwork, connectionState])

  const isControllerConnectingToNetwork =
    controllerNetworkConnectionStatus === ConnectionStatus.CONNECTING

  return (
    <>
      {targetNetwork && isControllerConnectedToNetwork ? (
        <ConnectingLoader network={targetNetwork} />
      ) : (
        <>
          <Form
            onSuccess={handleSuccess}
            onSubmit={() =>
              setControllerNetworkConnectionStatus(ConnectionStatus.CONNECTING)
            }
            onError={() =>
              setControllerNetworkConnectionStatus(
                ConnectionStatus.DISCONNECTED,
              )
            }
          />
          <Link
            href={routes.modes}
            replace
            disabled={isControllerConnectingToNetwork}
            className={`mb-4 text-center text-primary underline transition-opacity ${isControllerConnectingToNetwork && 'opacity-50'}`}
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

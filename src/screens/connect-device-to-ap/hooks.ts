import { NetInfoStateType, useNetInfo } from '@react-native-community/netinfo'
import { useEffect, useState } from 'react'

export const useCurrentSSID = () => {
  const { isConnected, type, details } = useNetInfo()
  const [SSID, setSSID] = useState<string | null>(null)

  useEffect(() => {
    if (isConnected && type === NetInfoStateType.wifi) {
      setSSID(details.ssid)
    } else {
      setSSID(null)
    }
  }, [isConnected, type, details])

  return SSID
}

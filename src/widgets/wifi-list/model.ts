import { useEffect, useState } from 'react'
import { PermissionsAndroid } from 'react-native'
import WifiManager, { type WifiEntry } from 'react-native-wifi-reborn'

const requestPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location permission is required for WiFi connections',
      message:
        'This app needs location permission as this is required  ' +
        'to scan for wifi networks.',
      buttonNegative: 'DENY',
      buttonPositive: 'ALLOW',
    },
  )

  return granted
}

export const useWifiList = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [wifiList, setWifiList] = useState<WifiEntry[]>([])

  const reScanWifiList = async () => {
    setIsLoading(true)
    const list = await WifiManager.reScanAndLoadWifiList()
    setWifiList(list)
    setIsLoading(false)
  }

  const handleConnect = () => {}

  useEffect(() => {
    const getWifiList = async () => {
      const granted = await requestPermission()

      if (granted === 'granted') {
        setIsLoading(true)
        const list = await WifiManager.loadWifiList()
        setWifiList(list)
        setIsLoading(false)
      }
    }

    const timeout = setTimeout(() => getWifiList(), 300)

    return () => clearTimeout(timeout)
  }, [])

  return { wifiList, isLoading, reScanWifiList, handleConnect }
}

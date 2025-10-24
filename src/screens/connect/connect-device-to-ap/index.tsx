import { router } from 'expo-router'
import { useState } from 'react'

import { BackButton, Card } from '../components'
import { Form } from './form'
import { SuccessOverlay } from './success-overlay'

export const ConnectDeviceToAPForm = () => {
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false)

  const handleSuccess = () => {
    setShowSuccessOverlay(true)

    setTimeout(() => {
      setShowSuccessOverlay(false)

      router.navigate('/modes')
    }, 500)
  }

  return (
    <Card title="Connect device to access point" action={<BackButton />}>
      <Form onSuccess={handleSuccess} />
      {showSuccessOverlay ? <SuccessOverlay /> : null}
    </Card>
  )
}

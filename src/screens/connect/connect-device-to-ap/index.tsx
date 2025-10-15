import { useState } from 'react'

import { BackButton, Card } from '../components'
import { Form } from './form'
import { SuccessOverlay } from './success-overlay'

export const ConnectDeviceToAPForm = () => {
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false)
  return (
    <Card title="Connect device to access point" action={<BackButton />}>
      <Form onSuccess={() => setShowSuccessOverlay(true)} />
      {showSuccessOverlay ? <SuccessOverlay /> : null}
    </Card>
  )
}

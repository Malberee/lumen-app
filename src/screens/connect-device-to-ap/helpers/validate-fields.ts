import type { Fields } from '../hooks'

export const validateFields = (fields: Fields) => {
  const errors: Partial<Fields> = {}

  if (!fields.ssid.trim()) errors.ssid = 'SSID is required!'
  if (!fields.password.trim()) errors.password = 'Password is required!'

  return errors
}

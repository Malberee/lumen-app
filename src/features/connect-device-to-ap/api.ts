import { UDP } from '@shared/api'

export const sendCredentials = async (credentials: string) => {
  await UDP.init()
  await UDP.sendMessage(credentials)

  const response = await UDP.waitForResponse()

  UDP.close()

  if (response.includes('.')) {
    UDP.setIP(response)
    return response
  } else {
    throw new Error(response)
  }
}

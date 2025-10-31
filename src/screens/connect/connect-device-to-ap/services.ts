import { UDP } from '@services'

export const sendCredentials = async (credentials: string) => {
  await UDP.init()
  await UDP.sendMessage(credentials)

  const response = await UDP.waitForResponse()

  await UDP.close()
  UDP.setIP(response)

  return response
}

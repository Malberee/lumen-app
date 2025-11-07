import { UDP } from '@services'
import { objToString } from '@utils'

const ipRegex = new RegExp(
  /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/,
)

export const sendCredentials = async (ssid: string, pass: string) => {
  await UDP.init()
  await UDP.sendMessage(`CRD ${objToString({ ssid, pass })}`)

  const response = await UDP.waitForResponse(30_000)

  await UDP.close()

  if (ipRegex.test(response)) {
    return response
  } else {
    throw new Error(response)
  }
}

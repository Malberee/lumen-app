export const isIPAddress = (string: string) => {
  const ipRegex = new RegExp(
    /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/,
  )

  return ipRegex.test(string)
}

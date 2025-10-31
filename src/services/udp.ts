import dgram from 'react-native-udp'

export const DEFAULT_ESP_IP = '192.168.4.1'

let ESP_IP = DEFAULT_ESP_IP
const ESP_PORT = 8888

let socket: ReturnType<typeof dgram.createSocket> | null = null

const init = (): Promise<void> =>
  new Promise((resolve, reject) => {
    try {
      if (socket) {
        return resolve()
      }

      socket = dgram.createSocket({
        type: 'udp4',
        debug: process.env.NODE_ENV === 'development',
      })

      socket.on('error', (error) => {
        socket?.close()
        socket = null
        reject(new Error(error))
      })

      socket.on('listening', () => resolve())

      socket.bind(ESP_PORT)
    } catch (error) {
      reject(error)
    }
  })

const close = () =>
  new Promise((resolve) => {
    if (!socket) return resolve('Socket already closed')

    try {
      socket.close(() => {
        socket = null
        ESP_IP = DEFAULT_ESP_IP
        resolve('Socket closed')
      })
    } catch {
      socket = null
      resolve('Socket closed with error')
    }
  })

const sendMessage = (message: string): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!socket) return reject(new Error('Socket is not initialized!'))

    const buffer = Buffer.from(message, 'utf-8')
    socket.send(buffer, 0, buffer.length, ESP_PORT, ESP_IP, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })

const waitForResponse = (): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!socket) return reject(new Error('Socket is not initialized!'))

    let timeout: NodeJS.Timeout

    const onMessage = (message: Buffer) => {
      clearTimeout(timeout)
      socket?.off('message', onMessage)
      resolve(message.toString())
    }

    socket.on('message', onMessage)

    timeout = setTimeout(() => {
      socket?.off('message', onMessage)
      reject(new Error('Timeout'))
    }, 10_000)
  })

const setIP = (ip: string) => (ESP_IP = ip)

export const UDP = {
  init,
  close,
  sendMessage,
  waitForResponse,
  setIP,
  isInitialized: () => !!socket,
}

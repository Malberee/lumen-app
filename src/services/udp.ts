import dgram from 'react-native-udp'

const DEFAULT_DEVICE_IP = '192.168.4.1'
let DEVICE_IP = DEFAULT_DEVICE_IP
const DEVICE_PORT = 8888
const PORT = 8888

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

      socket.bind(PORT)
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
    socket.send(buffer, 0, buffer.length, DEVICE_PORT, DEVICE_IP, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })

const waitForResponse = (timeoutMs = 10_000): Promise<string> =>
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
    }, timeoutMs)
  })

const setIP = (ip: string) => (DEVICE_IP = ip)
const resetIP = () => (DEVICE_IP = DEFAULT_DEVICE_IP)

export const UDP = {
  init,
  close,
  sendMessage,
  waitForResponse,
  setIP,
  resetIP,
  isInitialized: () => !!socket,
}

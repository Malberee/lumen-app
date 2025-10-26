import dgram from 'react-native-udp'

const DEFAULT_ESP_IP = '192.168.4.1'

export let ESP_IP = DEFAULT_ESP_IP
const ESP_PORT = 8888

type Listener = (msg: Buffer, rinfo: { address: string; port: number }) => void

let socket: ReturnType<typeof dgram.createSocket> | null = null
let messageListener: Listener | null = null

export const setIP = (ip: string) => (ESP_IP = ip)

const init = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (socket) {
      return resolve()
    }

    socket = dgram.createSocket({
      type: 'udp4',
      debug: process.env.NODE_ENV === 'development',
    })

    socket.on('error', async (err) => {
      await close()
      reject(err)
    })

    socket.bind(ESP_PORT, (err: Error) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const close = (): Promise<void> => {
  return new Promise((resolve) => {
    if (!socket) return resolve()

    socket?.close(() => {
      socket = null
      resolve()
    })
  })
}

const sendMessage = (message: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!socket) return reject(new Error('Socket is not initialized'))

    const buffer = Buffer.from(message, 'utf-8')
    socket.send(buffer, 0, buffer.length, ESP_PORT, ESP_IP, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const waitForResponse = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!socket) return reject(new Error('Socket is not initialized'))

    const timeout = setTimeout(() => {
      if (messageListener) {
        socket?.off('message', messageListener)
        messageListener = null
      }
      reject(
        new Error(
          'There`s no connection to the board.\nLooks like you are connected to the\nwrong network.',
        ),
      )
    }, 30000)

    messageListener = (msgBuffer) => {
      const msg = msgBuffer.toString().trim()

      clearTimeout(timeout)
      socket?.off('message', messageListener!)
      resolve(msg)
    }

    socket.on('message', messageListener)
  })
}

const disconnect = async () => {
  await UDP.sendMessage('DSCNT')
  await UDP.close()
  UDP.setIP(DEFAULT_ESP_IP)
}

export const UDP = {
  socket,
  init,
  close,
  sendMessage,
  waitForResponse,
  disconnect,
  setIP,
}

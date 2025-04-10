import dgram from 'react-native-udp'

let ESP_IP = '192.168.4.1'
const ESP_PORT = 8888

type Listener = (msg: Buffer, rinfo: { address: string; port: number }) => void

let socket: ReturnType<typeof dgram.createSocket> | null = null
let messageListener: Listener | null = null

const init = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (socket) {
      return resolve()
    }

    socket = dgram.createSocket({ type: 'udp4', debug: true })

    socket.on('error', (err) => {
      close()
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

const close = () => {
  if (socket) {
    socket.close()
    socket = null
  }
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

const waitForResponse = () => {
  return new Promise((resolve, reject) => {
    if (!socket) return reject(new Error('Socket is not initialized'))

    const timeout = setTimeout(() => {
      if (messageListener) {
        socket?.off('message', messageListener)
        messageListener = null
      }
      reject(new Error('Timeout'))
    }, 3000)

    messageListener = (msgBuffer) => {
      const msg = msgBuffer.toString().trim()

      clearTimeout(timeout)
      socket?.off('message', messageListener!)
      resolve(msg)
    }

    socket.on('message', messageListener)
  })
}

export const UDP = { socket, init, close, sendMessage, waitForResponse }

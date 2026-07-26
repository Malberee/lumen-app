export const DEFAULT_CONTROLLER_IP = '192.168.4.1'

export const messages = {
  info: {
    connected: 'Connected',
    alreadyConnected: 'Already connected',
    disconnected: 'Disconnected',
  },
  error: {
    connectionFailed: 'Connection failed',
    noConnection: 'No connection',
    timeout: 'Timeout',
    requestInProgress: 'Another request is already in progress',
  },
}

export const commandHeaders = {
  connect: 'CNT',
  disconnect: 'DSCNT',
  mode: 'MODE',
  powerOn: 'P_ON',
  powerOff: 'P_OFF',
  credentials: 'CRD',
}

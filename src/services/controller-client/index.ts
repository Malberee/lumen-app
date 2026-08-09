import { ControllerClient } from './controller-client'

export { ConnectionStatus } from './controller-client'
export { CloseReason as DisconnectReason } from './transport-client'

export const controllerClient = new ControllerClient()

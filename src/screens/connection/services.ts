import { UDP } from '@services'

export const pingDevice = (intervalMs = 5000, attempts = 3): Promise<void> =>
  new Promise(async (resolve, reject) => {
    const socketInitialized = UDP.isInitialized()

    if (!socketInitialized) {
      await UDP.init()
    }

    for (let i = 0; i <= attempts; i++) {
      try {
        await UDP.sendMessage('PING')

        const response = await UDP.waitForResponse(intervalMs)

        if (response === 'PONG') {
          if (!socketInitialized) {
            await UDP.close()
          }
          resolve()
          break
        }
      } catch {
        continue
      }
    }

    if (!socketInitialized) {
      await UDP.close()
    }
    return reject(new Error('No connection'))
  })

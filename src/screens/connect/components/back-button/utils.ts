export const chain =
  (...callbacks: any[]): ((...args: any[]) => void) =>
  (...args: any[]) => {
    for (const callback of callbacks) {
      if (typeof callback === 'function') {
        callback(...args)
      }
    }
  }

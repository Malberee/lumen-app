export class Deferred<T> {
  readonly promise: Promise<T>

  private resolvePromise!: (value: T) => void
  private rejectPromise!: (error: Error) => void

  private settled = false

  constructor(private readonly onSettled?: () => void) {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolvePromise = resolve
      this.rejectPromise = reject
    })
  }

  resolve(value: T) {
    if (!this.finalize()) {
      return
    }

    this.resolvePromise(value)
  }

  reject(error: Error) {
    if (!this.finalize()) {
      return
    }

    this.rejectPromise(error)
  }

  private finalize(): boolean {
    if (this.settled) {
      return false
    }

    this.settled = true
    this.onSettled?.()

    return true
  }
}

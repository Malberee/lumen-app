export const arrayToObject = <T>(array: T[]): Record<number, T> => {
  'worklet'
  return Object.fromEntries(array.map((value, index) => [index, value]))
}

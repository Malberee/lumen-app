export const objToString = (obj: object) => {
  return Object.entries(obj)
    .map((item) => item.join('='))
    .join(';')
}

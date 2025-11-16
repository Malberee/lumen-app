export const serialize = (obj: object) => {
  return Object.entries(obj)
    .filter((item) => item[1] !== undefined)
    .map((item) => item.join('='))
    .join(';')
}

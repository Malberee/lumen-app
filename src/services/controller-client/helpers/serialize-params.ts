export const serializeParams = (obj: object) => {
  const separators = {
    pair: ';',
    assignment: '=',
    value: ',',
  }

  return Object.entries(obj)
    .filter((item) => item[1] !== undefined)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return key + separators.assignment + value.join(separators.value)
      }

      return key + separators.assignment + value
    })
    .join(separators.pair)
}

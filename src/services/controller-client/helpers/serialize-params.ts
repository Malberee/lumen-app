export const serializeParams = (obj: object) => {
  const separators = {
    pair: ';',
    assignment: '=',
    value: ',',
  }

  return Object.entries(obj)
    .filter((item) => item[1] !== undefined)
    .map(([key, value]) => {
      if (typeof value === 'object') {
        const RGBValues = Object.values(value)
        return key + separators.assignment + RGBValues.join(separators.value)
      }
      return key + separators.assignment + value
    })
    .join(separators.pair)
}

export const flatObject = (obj: object) => {
  function flat(o: object): any {
    return Object.entries(o).flatMap(([key, val]) => {
      if (typeof val === 'object') return flat(val)

      return [[key, val]]
    })
  }

  return Object.fromEntries(flat(obj))
}

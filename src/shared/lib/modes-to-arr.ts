export const modesToArr = (modes: object) =>
  Object.entries(modes).map(([key, value]) => ({
    name: key,
    ...value,
  }))

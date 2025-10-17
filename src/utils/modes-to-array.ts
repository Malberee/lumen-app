export const modesToArray = (modes: object) =>
  Object.entries(modes).map(([key, value]) => ({
    name: key,
    ...value,
  }))

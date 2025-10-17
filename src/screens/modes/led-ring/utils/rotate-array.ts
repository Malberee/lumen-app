export const rotateArray = (arr: string[]) => [
  ...arr.slice(-1),
  ...arr.slice(0, -1),
]

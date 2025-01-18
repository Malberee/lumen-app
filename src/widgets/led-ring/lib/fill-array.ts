export const fillArray = (
  arr: string[],
  colors: Record<string, string>,
  reverse: boolean,
) => {
  const [primary, secondary]: string[] = Object.values(colors)

  const lastIndex = arr.findLastIndex((item) =>
    reverse ? item === secondary : item === primary,
  )

  return arr.map((item, index) => {
    if (index <= lastIndex + 1) {
      return reverse ? secondary : primary
    }

    return item
  })
}

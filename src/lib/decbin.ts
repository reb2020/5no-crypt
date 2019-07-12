export default (num: number): string => {
  if (num < 0) {
    num = 0xFFFFFFFF + num + 1
  }

  return Number(num).toString(2)
}

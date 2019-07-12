export default (binaryString: string): number => {
  binaryString = (binaryString + '').replace(/[^01]/gi, '')

  return parseInt(binaryString, 2)
}

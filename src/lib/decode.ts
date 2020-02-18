import decbin from './decbin'
import bindec from './bindec'

export default (str: string, keys: CryptInterface.KeysReverse): string => {
  const decText = str.split('').map((t: string): string => decbin(Number(keys[t])).padStart(5, '0')).join('')

  return bindec(decText).toString()
}

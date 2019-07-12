import decbin from './decbin'
import bindec from './bindec'
import cryptInterface from '../interface'

export default (str: string, keys: cryptInterface.Keys): string => {
  let bstr: string = decbin(Number(str))
  const size: number = bstr.length
  const p = Math.ceil(size / 5)
  let rez: Array<any> = []

  bstr = bstr.padStart(p * 5, '0')

  for (let i = 0; i < p; i++) {
    rez.push(keys[bindec(bstr.substr(i * 5, 5))])
  }

  return rez.join('')
}

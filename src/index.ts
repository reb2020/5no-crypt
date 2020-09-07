import { CryptInterface } from '../typings/app'

import stringToHex from './lib/stringToHex'
import hexToString from './lib/hexToString'
import encodeText from './lib/encode'
import decodeText from './lib/decode'

class Crypt implements CryptInterface.Crypt {
    private keyStr: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    private ord: CryptInterface.Ord = {}
    private chr: CryptInterface.Chr = {}
    private keys: CryptInterface.Keys = {}
    private keysReverse: CryptInterface.KeysReverse = {}
    private text: string
    private salt: string

    constructor(text: string, salt: string = '') {
      this.text = text
      this.salt = salt

      if (salt) {
        this.salt = Buffer.from(salt).toString('base64').replace(/[^a-zA-Z0-9]+/g, '')
        const newStr: CryptInterface.KeysReverse = {}
        let index = 0
        for (const key of this.salt.split('')) {
          newStr[key] = index
          index++
        }
        for (const key of this.keyStr.split('')) {
          newStr[key] = index
          index++
        }
        this.keyStr = Object.keys(newStr).join('')
      }

      let index = 0
      for (const key of this.keyStr.split('')) {
        this.keys[index] = key
        this.keysReverse[key] = index
        index++
      }
    }

    private init(startIndex: number): void {
      let index = startIndex
      for (const key of this.keyStr.split('')) {
        this.ord[key] = index
        this.chr[index] = key
        index++
      }
    }

    private stringToOrd(text: string): Array<any> {
      const newStr: Array<any> = []
      for (const key of text.split('')) {
        newStr.push(this.ord[key])
      }

      return newStr
    }

    private stringToChr(text: string): Array<any> {
      const newStr: Array<any> = []
      const tArray = text.split('')
      for (let i = 0; i < tArray.length; i = i + 2) {
        newStr.push(this.chr[tArray[i] + tArray[i + 1]])
      }

      return newStr
    }

    public encrypt(): string {
      const index: number = Math.floor(10 + Math.random() * 16)
      this.init(index)

      const newStr = this.stringToOrd(stringToHex(this.text))
      const step = 3
      const strLen = newStr.length

      const result = newStr.reduce((data: CryptInterface.ReduceData, current: string): CryptInterface.ReduceData => {
        data.data.push(current)
        data.index++

        if ((data.index % step) === 0 || strLen === data.index) {
          data.allData.push(data.data)
          data.data = []
        }

        return data
      }, {
        index: 0,
        data: [],
        allData: [],
      })

      const newText = result.allData.map((block: CryptInterface.Block): string => encodeText(block.join(''), this.keys)).join('')

      return `${this.keys[index]}${newText}`
    }

    public decrypt(): string {
      const index: number = this.keysReverse[this.text.substr(0, 1)]
      this.init(index)

      const step = 4
      const bHash: string = this.text.substr(1, this.text.length - 1).replace('_', '')
      let b = 0

      const result = bHash.split('').reduce((data: CryptInterface.ReduceData, current: string): CryptInterface.ReduceData => {
        data.data[b] = `${(data.data[b] ? data.data[b] : '')}${current}`
        data.index++

        if ((data.index % step) === 0) {
          b++
        }

        return data
      }, {
        index: 0,
        data: [],
        allData: [],
      })

      const newText: string = result.data.map((part: string): string => decodeText(part, this.keysReverse)).join('')
      const hex: Array<any> = this.stringToChr(newText)

      return hexToString(hex.join(''))
    }
}

export default (text: string, salt: string = ''): CryptInterface.Crypt => new Crypt(text, salt)

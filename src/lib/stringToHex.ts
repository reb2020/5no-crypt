import convert from './convert'
export default (text: string): string => convert(text, 'utf8', 'hex')

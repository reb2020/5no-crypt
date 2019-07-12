import convert from './convert'
export default (text: string): string => convert(text, 'hex', 'utf8')

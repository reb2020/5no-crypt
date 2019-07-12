type Allow = 'utf8' | 'hex'
export default (text: string, from: Allow, to: Allow): string => Buffer.from(text, from).toString(to)

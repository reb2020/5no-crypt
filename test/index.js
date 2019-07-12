const chai = require('chai')

const Crypt = require('../compiled')

const expect = chai.expect

describe('Crypt', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  it('generate random strings', () => {
    for (let i = 0; i <= 1000; i++) {
      let r = Math.random().toString(36).substr(0, 5)
      let s = Math.random().toString(36).substr(0, 5)
      let enText = Crypt(r, s).encrypt()

      let deText = Crypt(enText, s).decrypt()

      expect(r).to.eql(deText)
    }
  })

  it('long strings', () => {
    let r = '1kn12kjbb dc9vh9v jsd onsgodsighj ngbgdsfg d :-0111111111111++,'
    let enText = Crypt(r, '100200300qoiweuyqiueqye').encrypt()

    let deText = Crypt(enText, '100200300qoiweuyqiueqye').decrypt()

    expect(r).to.eql(deText)
  })
})

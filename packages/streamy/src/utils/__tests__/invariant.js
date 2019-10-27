import {invariant} from '../invariant.js'

describe('invariant', () => {
  it('should throw an when message is invalid', () => {
    expect(() => {
      invariant({message: 1})
    }).toThrowErrorMatchingSnapshot()
  })

  it('should throw an when conditon is a function that returns a string', () => {
    expect(() => {
      invariant({message: 'string', condition: () => 'ste'})
    }).toThrowErrorMatchingSnapshot()
  })

  it('should throw an error when conditon is a string', () => {
    expect(() => {
      invariant({message: 'string', condition: ''})
    }).toThrowErrorMatchingSnapshot()
  })

  it('should throw an error when the errorConstructor is a string', () => {
    expect(() => {
      invariant({message: 'string', condition: false, errorConstructor: 'stes'})
    }).toThrowErrorMatchingSnapshot()
  })
})

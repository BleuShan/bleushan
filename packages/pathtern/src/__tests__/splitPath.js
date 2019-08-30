import splitPath from '../splitPath.js'
import {
  emptyString,
  regexp,
  plainObject,
  createdPlainObject,
  numberArray,
  DummyClass,
  arrowFunction,
  fn,
  emptyArray
} from '../__fixtures__/constants.js'

describe('splitPath', () => {
  describe('when called with the valid path', () => {
    it.each`
      path                            | expected
      ${'/'}                          | ${['/']}
      ${'/test'}                      | ${['/', 'test']}
      ${'/:test'}                     | ${['/', ':test']}
      ${'/:test/:id'}                 | ${['/', ':test', ':id']}
      ${'/{test}'}                    | ${['/', '{test}']}
      ${'/{test}/{id}'}               | ${['/', '{test}', '{id}']}
      ${'/{test}/:id'}                | ${['/', '{test}', ':id']}
      ${'/{test:base64}/{id:number}'} | ${['/', '{test:base64}', '{id:number}']}
      ${'/{test:base64}/:slug'}       | ${['/', '{test:base64}', ':slug']}
      ${'test/hello'}                 | ${['test', 'hello']}
      ${'test'}                       | ${['test']}
    `('$path should return with $expected', ({path, expected}) => {
      expect(splitPath(path)).toEqual(expected)
    })
  })

  describe('when called with the invalid path', () => {
    it.each(
      [
        emptyString,
        regexp,
        plainObject,
        createdPlainObject,
        numberArray,
        emptyArray,
        new DummyClass(),
        fn,
        arrowFunction,
        null,
        undefined
      ].map((invalidPath) => [invalidPath, []])
    )('%p should return with %p', (path, expected) => {
      expect(splitPath(path)).toEqual(expected)
    })
  })
})

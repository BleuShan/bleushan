import entry from '../entry'

describe('entry', () => {
  describe('with an empty config', () => {
    describe('when given a keypath', () => {
      const keypath = ['main']

      describe('and an entry string', () => {
        const mainEntryPath = './main'

        it('should set the entry field appropriately', () => {
          const expectedConfig = {
            entry: {
              main: [mainEntryPath]
            }
          }

          const config = entry(keypath, mainEntryPath)({})
          expect(config).toEqual(expectedConfig)
        })
      })

      describe('and an array of entries', () => {
        const mainEntriesPath = ['./main', './react']
        it('should set the entry field appropriately', () => {
          const expectedConfig = {
            entry: {
              main: mainEntriesPath
            }
          }

          const config = entry(keypath, mainEntriesPath)({})
          expect(config).toEqual(expectedConfig)
        })
      })
    })

    describe('when given an empty keypath', () => {
      const keypath = []
      describe('and a config object', () => {
        const entriesConfig = {
          main: ['./main']
        }

        it('should set the the entry field appropriately', () => {
          const expectedConfig = {
            entry: entriesConfig
          }

          const config = entry(keypath, entriesConfig)({})
          expect(config).toEqual(expectedConfig)
        })
      })
    })
  })
})

# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.0.1](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@6.0.0...@bleushan/babel-preset-env@6.0.1) (2019-11-18)

**Note:** Version bump only for package @bleushan/babel-preset-env





# [6.0.0](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@5.0.0...@bleushan/babel-preset-env@6.0.0) (2019-11-18)


### Features

* **babel-preset-env:** overhaul import configuration ([aaeb637](https://github.com/BleuShan/bleushan/commit/aaeb63794023e7b6e7adf81fee13db6c92189d81))


### BREAKING CHANGES

* **babel-preset-env:** * `import` field is now `imports`.
* `transform-runtime` is now turn off by default and can be configured via the `runtime` field
* the entry point is now `preset.js` instead of `index.js`





# [5.0.0](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@4.2.0...@bleushan/babel-preset-env@5.0.0) (2019-11-15)


### Bug Fixes

* use utils barrel import ([ddffa05](https://github.com/BleuShan/bleushan/commit/ddffa05f032cd9155a90aac08ea66d6e18ee6598))


### Code Refactoring

* build everything with rollup ([2dc9f47](https://github.com/BleuShan/bleushan/commit/2dc9f47cdaf0b42afebca52fbca9a83fb0c0f16d))
* **utils:** move streamy utils into its own package ([f4e75ef](https://github.com/BleuShan/bleushan/commit/f4e75efea1b12f68e47a2d250f56f8746cdda95f))


### BREAKING CHANGES

* `lib` folders have been standardized to enable esm/cjs output
* **utils:** * streamy now uses default exports
* pathtern now share is utils





# [4.2.0](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@4.1.0...@bleushan/babel-preset-env@4.2.0) (2019-11-09)


### Features

* **babel-preset:** add nullish coalescing and bump deps ([113c295](https://github.com/BleuShan/bleushan/commit/113c295b7b589aa4c96324185a8adc8bf161679f))





# [4.1.0](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@4.0.0...@bleushan/babel-preset-env@4.1.0) (2019-11-02)


### Features

* add big int support ([54bafbf](https://github.com/BleuShan/bleushan/commit/54bafbf9633fb4240828bed453e2f72a67221f0a))





# [4.0.0](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@3.0.1...@bleushan/babel-preset-env@4.0.0) (2019-10-28)


### Bug Fixes

* **babel-preset:** fix minify require ([ba4f818](https://github.com/BleuShan/bleushan/commit/ba4f81881113f8e2936ad0cf06ae49e687c4b4cc))
* **eslint-config:** use our own babel-eslint fork ([24573e6](https://github.com/BleuShan/bleushan/commit/24573e62e489ec7a5a9cbc32d13e4dfb863bcfba))


### Features

* add streamy package ([d693da1](https://github.com/BleuShan/bleushan/commit/d693da12c9d00f46e1f0e5f43fc14d5035611013))


### BREAKING CHANGES

* **eslint-config:** we now depend on @bleushan/babel-eslint





## [3.0.1](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@3.0.0...@bleushan/babel-preset-env@3.0.1) (2019-10-27)


### Bug Fixes

* rework dependencies and delete tools package ([57073ea](https://github.com/BleuShan/bleushan/commit/57073ea962239006bc68eaf7a0e30cdc40822c4b))





# [3.0.0](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@2.5.1...@bleushan/babel-preset-env@3.0.0) (2019-10-25)


### Bug Fixes

* **babel-preset:** bump deps and ensure pnp compatibility ([541f889](https://github.com/BleuShan/bleushan/commit/541f889))


### BREAKING CHANGES

* **babel-preset:** core-js regenerator-runtime are now peerDependencies





## [2.5.1](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@2.5.0...@bleushan/babel-preset-env@2.5.1) (2019-10-25)

**Note:** Version bump only for package @bleushan/babel-preset-env





# [2.5.0](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@2.4.3...@bleushan/babel-preset-env@2.5.0) (2019-09-07)


### Features

* **babel-preset:** enable all proposal ([d59e2ce](https://github.com/BleuShan/bleushan/commit/d59e2ce))





## [2.4.3](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@2.4.2...@bleushan/babel-preset-env@2.4.3) (2019-09-01)

**Note:** Version bump only for package @bleushan/babel-preset-env





## [2.4.2](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@2.4.1...@bleushan/babel-preset-env@2.4.2) (2019-08-31)

**Note:** Version bump only for package @bleushan/babel-preset-env





## [2.4.1](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@2.4.0...@bleushan/babel-preset-env@2.4.1) (2019-08-31)


### Bug Fixes

* **babel-preset:** fix targets.esmodules ([1b30feb](https://github.com/BleuShan/bleushan/commit/1b30feb))





# [2.4.0](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@2.3.0...@bleushan/babel-preset-env@2.4.0) (2019-08-30)


### Features

* **eslint-config:** ditch the old fp thing ([9e18131](https://github.com/BleuShan/bleushan/commit/9e18131))





# [2.3.0](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@2.2.1...@bleushan/babel-preset-env@2.3.0) (2019-08-30)


### Features

* **babel-preset:** add import.meta support ([57a4457](https://github.com/BleuShan/bleushan/commit/57a4457))





## [2.2.1](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@2.2.0...@bleushan/babel-preset-env@2.2.1) (2019-08-09)


### Bug Fixes

* **babel-plugin:** make use of babel built-in  dynamic import support ([559cdc6](https://github.com/BleuShan/bleushan/commit/559cdc6))





# [2.2.0](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@2.1.0...@bleushan/babel-preset-env@2.2.0) (2019-04-05)


### Features

* update deps and run travis on node 11 ([5699808](https://github.com/BleuShan/bleushan/commit/5699808))





# [2.1.0](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@2.0.0...@bleushan/babel-preset-env@2.1.0) (2019-02-27)


### Features

* **babel-preset:** add latest babel support ([52290b5](https://github.com/BleuShan/bleushan/commit/52290b5))





# [2.0.0](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@1.2.4...@bleushan/babel-preset-env@2.0.0) (2019-01-19)


### Features

* **babel-preset-env:** add private fields and replace babel-plugin-import by babel-plugin-transform ([e0ba479](https://github.com/BleuShan/bleushan/commit/e0ba479))


### BREAKING CHANGES

* **babel-preset-env:** `babel-plugin-import` is replaced by `babel-plugin-transform-imports`





## [1.2.4](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@1.2.3...@bleushan/babel-preset-env@1.2.4) (2018-12-01)


### Bug Fixes

* **babel-preset-env:** prevent decorator options from reaching babel-preset ([c058b2a](https://github.com/BleuShan/bleushan/commit/c058b2a))





## [1.2.3](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@1.2.2...@bleushan/babel-preset-env@1.2.3) (2018-12-01)


### Bug Fixes

* **babel-preset-env:** prevent legacy decorators setting from generating invalid config ([b1b985a](https://github.com/BleuShan/bleushan/commit/b1b985a))





## [1.2.2](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@1.2.1...@bleushan/babel-preset-env@1.2.2) (2018-11-10)

**Note:** Version bump only for package @bleushan/babel-preset-env





## [1.2.1](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@1.2.0...@bleushan/babel-preset-env@1.2.1) (2018-11-10)

**Note:** Version bump only for package @bleushan/babel-preset-env





# [1.2.0](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@1.1.3...@bleushan/babel-preset-env@1.2.0) (2018-11-10)


### Features

* **preset-env:** update deps and add support for decorators/optionnal-chaining ([fda8249](https://github.com/BleuShan/bleushan/commit/fda8249))





## [1.1.3](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@1.1.2...@bleushan/babel-preset-env@1.1.3) (2018-11-10)

**Note:** Version bump only for package @bleushan/babel-preset-env





## [1.1.2](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@1.1.1...@bleushan/babel-preset-env@1.1.2) (2018-11-04)

**Note:** Version bump only for package @bleushan/babel-preset-env





## [1.1.1](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@1.1.0...@bleushan/babel-preset-env@1.1.1) (2018-11-04)

**Note:** Version bump only for package @bleushan/babel-preset-env





# [1.1.0](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@1.0.2...@bleushan/babel-preset-env@1.1.0) (2018-10-28)


### Features

* **babel-preset:** add dynamic import by default ([9fca34b](https://github.com/BleuShan/bleushan/commit/9fca34b))





## [1.0.2](https://github.com/BleuShan/bleushan/compare/@bleushan/babel-preset-env@1.0.1...@bleushan/babel-preset-env@1.0.2) (2018-10-26)


### Bug Fixes

* **build:** fixed messed up package.json ([960000a](https://github.com/BleuShan/bleushan/commit/960000a))





## 1.0.1 (2018-10-20)


### Bug Fixes

* fix babel-7 breaking changes ([13fa400](https://github.com/BleuShan/bleushan/commit/13fa400))

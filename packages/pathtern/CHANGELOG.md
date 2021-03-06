# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.1.0](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@4.0.4...@bleushan/pathtern@4.1.0) (2020-03-27)


### Features

* support latest babel ([bd5c52a](https://github.com/BleuShan/bleushan/commit/bd5c52a822e2fe967bab23ff0688080b2dd0511a))





## [4.0.4](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@4.0.3...@bleushan/pathtern@4.0.4) (2019-12-07)

**Note:** Version bump only for package @bleushan/pathtern





## [4.0.3](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@4.0.2...@bleushan/pathtern@4.0.3) (2019-11-29)

**Note:** Version bump only for package @bleushan/pathtern





## [4.0.2](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@4.0.1...@bleushan/pathtern@4.0.2) (2019-11-29)

**Note:** Version bump only for package @bleushan/pathtern





## [4.0.1](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@4.0.0...@bleushan/pathtern@4.0.1) (2019-11-18)

**Note:** Version bump only for package @bleushan/pathtern





# [4.0.0](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@3.0.0...@bleushan/pathtern@4.0.0) (2019-11-18)


### Features

* **babel-preset-env:** overhaul import configuration ([aaeb637](https://github.com/BleuShan/bleushan/commit/aaeb63794023e7b6e7adf81fee13db6c92189d81))


### BREAKING CHANGES

* **babel-preset-env:** * `import` field is now `imports`.
* `transform-runtime` is now turn off by default and can be configured via the `runtime` field
* the entry point is now `preset.js` instead of `index.js`





# [3.0.0](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@2.0.2...@bleushan/pathtern@3.0.0) (2019-11-15)


### Bug Fixes

* use utils barrel import ([ddffa05](https://github.com/BleuShan/bleushan/commit/ddffa05f032cd9155a90aac08ea66d6e18ee6598))


### Code Refactoring

* build everything with rollup ([2dc9f47](https://github.com/BleuShan/bleushan/commit/2dc9f47cdaf0b42afebca52fbca9a83fb0c0f16d))
* **utils:** move streamy utils into its own package ([f4e75ef](https://github.com/BleuShan/bleushan/commit/f4e75efea1b12f68e47a2d250f56f8746cdda95f))


### BREAKING CHANGES

* `lib` folders have been standardized to enable esm/cjs output
* **utils:** * streamy now uses default exports
* pathtern now share is utils





## [2.0.2](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@2.0.1...@bleushan/pathtern@2.0.2) (2019-11-09)

**Note:** Version bump only for package @bleushan/pathtern





## [2.0.1](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@2.0.0...@bleushan/pathtern@2.0.1) (2019-11-02)

**Note:** Version bump only for package @bleushan/pathtern





# [2.0.0](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@1.0.1...@bleushan/pathtern@2.0.0) (2019-10-28)


### Bug Fixes

* **eslint-config:** use our own babel-eslint fork ([24573e6](https://github.com/BleuShan/bleushan/commit/24573e62e489ec7a5a9cbc32d13e4dfb863bcfba))


### Features

* add streamy package ([d693da1](https://github.com/BleuShan/bleushan/commit/d693da12c9d00f46e1f0e5f43fc14d5035611013))


### BREAKING CHANGES

* **eslint-config:** we now depend on @bleushan/babel-eslint





## [1.0.1](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@1.0.0...@bleushan/pathtern@1.0.1) (2019-10-27)


### Bug Fixes

* rework dependencies and delete tools package ([57073ea](https://github.com/BleuShan/bleushan/commit/57073ea962239006bc68eaf7a0e30cdc40822c4b))





# [1.0.0](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.2.5...@bleushan/pathtern@1.0.0) (2019-10-25)


### Bug Fixes

* **babel-preset:** bump deps and ensure pnp compatibility ([541f889](https://github.com/BleuShan/bleushan/commit/541f889))


### BREAKING CHANGES

* **babel-preset:** core-js regenerator-runtime are now peerDependencies





## [0.2.5](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.2.4...@bleushan/pathtern@0.2.5) (2019-10-25)

**Note:** Version bump only for package @bleushan/pathtern





## [0.2.4](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.2.3...@bleushan/pathtern@0.2.4) (2019-09-07)

**Note:** Version bump only for package @bleushan/pathtern





## [0.2.3](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.2.2...@bleushan/pathtern@0.2.3) (2019-09-01)

**Note:** Version bump only for package @bleushan/pathtern





## [0.2.2](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.2.1...@bleushan/pathtern@0.2.2) (2019-08-31)

**Note:** Version bump only for package @bleushan/pathtern





## [0.2.1](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.2.0...@bleushan/pathtern@0.2.1) (2019-08-31)

**Note:** Version bump only for package @bleushan/pathtern





# [0.2.0](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.1.12...@bleushan/pathtern@0.2.0) (2019-08-30)


### Features

* **eslint-config:** ditch the old fp thing ([9e18131](https://github.com/BleuShan/bleushan/commit/9e18131))





## [0.1.12](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.1.11...@bleushan/pathtern@0.1.12) (2019-08-30)

**Note:** Version bump only for package @bleushan/pathtern





## [0.1.11](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.1.10...@bleushan/pathtern@0.1.11) (2019-08-09)

**Note:** Version bump only for package @bleushan/pathtern





## [0.1.10](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.1.9...@bleushan/pathtern@0.1.10) (2019-04-05)

**Note:** Version bump only for package @bleushan/pathtern





## [0.1.9](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.1.8...@bleushan/pathtern@0.1.9) (2019-02-27)

**Note:** Version bump only for package @bleushan/pathtern





## [0.1.8](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.1.7...@bleushan/pathtern@0.1.8) (2019-01-19)

**Note:** Version bump only for package @bleushan/pathtern





## [0.1.7](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.1.6...@bleushan/pathtern@0.1.7) (2018-12-01)

**Note:** Version bump only for package @bleushan/pathtern





## [0.1.6](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.1.5...@bleushan/pathtern@0.1.6) (2018-12-01)

**Note:** Version bump only for package @bleushan/pathtern





## [0.1.5](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.1.4...@bleushan/pathtern@0.1.5) (2018-11-11)

**Note:** Version bump only for package @bleushan/pathtern





## [0.1.4](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.1.3...@bleushan/pathtern@0.1.4) (2018-11-10)

**Note:** Version bump only for package @bleushan/pathtern





## [0.1.3](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.1.2...@bleushan/pathtern@0.1.3) (2018-11-10)

**Note:** Version bump only for package @bleushan/pathtern





## [0.1.2](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.1.1...@bleushan/pathtern@0.1.2) (2018-11-10)

**Note:** Version bump only for package @bleushan/pathtern





## [0.1.1](https://github.com/BleuShan/bleushan/compare/@bleushan/pathtern@0.1.0...@bleushan/pathtern@0.1.1) (2018-11-10)

**Note:** Version bump only for package @bleushan/pathtern





# 0.1.0 (2018-11-04)


### Features

* **pathtern:** initial release ([1ddc54a](https://github.com/BleuShan/bleushan/commit/1ddc54a))

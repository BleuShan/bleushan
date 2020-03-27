# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.1.0](https://github.com/BleuShan/bleushan/compare/@bleushan/streamy@3.0.4...@bleushan/streamy@3.1.0) (2020-03-27)


### Features

* support latest babel ([bd5c52a](https://github.com/BleuShan/bleushan/commit/bd5c52a822e2fe967bab23ff0688080b2dd0511a))





## [3.0.4](https://github.com/BleuShan/bleushan/compare/@bleushan/streamy@3.0.3...@bleushan/streamy@3.0.4) (2019-12-07)

**Note:** Version bump only for package @bleushan/streamy





## [3.0.3](https://github.com/BleuShan/bleushan/compare/@bleushan/streamy@3.0.2...@bleushan/streamy@3.0.3) (2019-11-29)

**Note:** Version bump only for package @bleushan/streamy





## [3.0.2](https://github.com/BleuShan/bleushan/compare/@bleushan/streamy@3.0.1...@bleushan/streamy@3.0.2) (2019-11-29)

**Note:** Version bump only for package @bleushan/streamy





## [3.0.1](https://github.com/BleuShan/bleushan/compare/@bleushan/streamy@3.0.0...@bleushan/streamy@3.0.1) (2019-11-18)

**Note:** Version bump only for package @bleushan/streamy





# [3.0.0](https://github.com/BleuShan/bleushan/compare/@bleushan/streamy@2.0.0...@bleushan/streamy@3.0.0) (2019-11-18)


### Features

* **babel-preset-env:** overhaul import configuration ([aaeb637](https://github.com/BleuShan/bleushan/commit/aaeb63794023e7b6e7adf81fee13db6c92189d81))


### BREAKING CHANGES

* **babel-preset-env:** * `import` field is now `imports`.
* `transform-runtime` is now turn off by default and can be configured via the `runtime` field
* the entry point is now `preset.js` instead of `index.js`





# [2.0.0](https://github.com/BleuShan/bleushan/compare/@bleushan/streamy@1.3.1...@bleushan/streamy@2.0.0) (2019-11-15)


### Bug Fixes

* use utils barrel import ([ddffa05](https://github.com/BleuShan/bleushan/commit/ddffa05f032cd9155a90aac08ea66d6e18ee6598))


### Code Refactoring

* build everything with rollup ([2dc9f47](https://github.com/BleuShan/bleushan/commit/2dc9f47cdaf0b42afebca52fbca9a83fb0c0f16d))
* **utils:** move streamy utils into its own package ([f4e75ef](https://github.com/BleuShan/bleushan/commit/f4e75efea1b12f68e47a2d250f56f8746cdda95f))


### BREAKING CHANGES

* `lib` folders have been standardized to enable esm/cjs output
* **utils:** * streamy now uses default exports
* pathtern now share is utils





## [1.3.1](https://github.com/BleuShan/bleushan/compare/@bleushan/streamy@1.3.0...@bleushan/streamy@1.3.1) (2019-11-09)

**Note:** Version bump only for package @bleushan/streamy





# [1.3.0](https://github.com/BleuShan/bleushan/compare/@bleushan/streamy@1.2.1...@bleushan/streamy@1.3.0) (2019-11-09)


### Features

* **babel-preset:** add nullish coalescing and bump deps ([113c295](https://github.com/BleuShan/bleushan/commit/113c295b7b589aa4c96324185a8adc8bf161679f))





## [1.2.1](https://github.com/BleuShan/bleushan/compare/@bleushan/streamy@1.2.0...@bleushan/streamy@1.2.1) (2019-11-04)

**Note:** Version bump only for package @bleushan/streamy





# [1.2.0](https://github.com/BleuShan/bleushan/compare/@bleushan/streamy@1.1.0...@bleushan/streamy@1.2.0) (2019-11-02)


### Features

* **streamy:** add a few utils and memo support ([bf8089c](https://github.com/BleuShan/bleushan/commit/bf8089ca3a81095a764d626d443988f6adcdb363))





# [1.1.0](https://github.com/BleuShan/bleushan/compare/@bleushan/streamy@1.0.0...@bleushan/streamy@1.1.0) (2019-11-01)


### Features

* **streamy:** add async support ([91cd8f6](https://github.com/BleuShan/bleushan/commit/91cd8f6ca75e3b39c887a4f2186728b77a750c35))





# 1.0.0 (2019-10-28)


### Bug Fixes

* **eslint-config:** use our own babel-eslint fork ([24573e6](https://github.com/BleuShan/bleushan/commit/24573e62e489ec7a5a9cbc32d13e4dfb863bcfba))


### Code Refactoring

* **streamy:** added missing tests and cleanup some stuff ([ecf8081](https://github.com/BleuShan/bleushan/commit/ecf80817af53ae83be3ddd311b8aac225dcbe497))


### Features

* add streamy package ([d693da1](https://github.com/BleuShan/bleushan/commit/d693da12c9d00f46e1f0e5f43fc14d5035611013))


### BREAKING CHANGES

* **streamy:** invariant `errorConstructor` is now `errorType`
* **eslint-config:** we now depend on @bleushan/babel-eslint

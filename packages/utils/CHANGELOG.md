# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.1.0](https://github.com/BleuShan/bleushan/compare/@bleushan/utils@2.0.4...@bleushan/utils@2.1.0) (2020-03-27)


### Features

* support latest babel ([bd5c52a](https://github.com/BleuShan/bleushan/commit/bd5c52a822e2fe967bab23ff0688080b2dd0511a))





## [2.0.4](https://github.com/BleuShan/bleushan/compare/@bleushan/utils@2.0.3...@bleushan/utils@2.0.4) (2019-12-07)

**Note:** Version bump only for package @bleushan/utils





## [2.0.3](https://github.com/BleuShan/bleushan/compare/@bleushan/utils@2.0.2...@bleushan/utils@2.0.3) (2019-11-29)

**Note:** Version bump only for package @bleushan/utils





## [2.0.2](https://github.com/BleuShan/bleushan/compare/@bleushan/utils@2.0.1...@bleushan/utils@2.0.2) (2019-11-29)

**Note:** Version bump only for package @bleushan/utils





## [2.0.1](https://github.com/BleuShan/bleushan/compare/@bleushan/utils@2.0.0...@bleushan/utils@2.0.1) (2019-11-18)

**Note:** Version bump only for package @bleushan/utils





# [2.0.0](https://github.com/BleuShan/bleushan/compare/@bleushan/utils@1.0.0...@bleushan/utils@2.0.0) (2019-11-18)


### Features

* **babel-preset-env:** overhaul import configuration ([aaeb637](https://github.com/BleuShan/bleushan/commit/aaeb63794023e7b6e7adf81fee13db6c92189d81))


### BREAKING CHANGES

* **babel-preset-env:** * `import` field is now `imports`.
* `transform-runtime` is now turn off by default and can be configured via the `runtime` field
* the entry point is now `preset.js` instead of `index.js`





# 1.0.0 (2019-11-15)


### Bug Fixes

* use utils barrel import ([ddffa05](https://github.com/BleuShan/bleushan/commit/ddffa05f032cd9155a90aac08ea66d6e18ee6598))


### Code Refactoring

* build everything with rollup ([2dc9f47](https://github.com/BleuShan/bleushan/commit/2dc9f47cdaf0b42afebca52fbca9a83fb0c0f16d))
* **utils:** move streamy utils into its own package ([f4e75ef](https://github.com/BleuShan/bleushan/commit/f4e75efea1b12f68e47a2d250f56f8746cdda95f))


### BREAKING CHANGES

* `lib` folders have been standardized to enable esm/cjs output
* **utils:** * streamy now uses default exports
* pathtern now share is utils

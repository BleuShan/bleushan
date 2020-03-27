import autoExternal from 'rollup-plugin-auto-external'
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import {dirname, basename} from 'path'

const IS_PRESET_DIRECTORY = /babel-preset-env/.test(process.cwd())

function configure(entrypoint) {
  const format = /cjs/.test(entrypoint) ? 'cjs' : 'esm'
  return {
    input: `src/${basename(entrypoint)}`,
    preserveModules: true,
    output: {
      dir: dirname(entrypoint),
      format,
      namespaceToStringTag: true
    },
    external(id) {
      return !/^\.{1,2}\//.test(id)
    },
    plugins: [
      autoExternal(),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
        overrides: IS_PRESET_DIRECTORY
          ? [
              {
                plugins: [
                  [
                    '@babel/plugin-transform-runtime',
                    {
                      useESModules: format === 'esm'
                    }
                  ]
                ]
              }
            ]
          : [
              {
                presets: [
                  [
                    '@bleushan/babel-preset-env',
                    {
                      imports: {
                        useESModules: format === 'esm'
                      }
                    }
                  ]
                ]
              }
            ]
      }),
      resolve(),
      commonjs(),
      terser({
        keep_classnames: true,
        keep_fnames: true
      })
    ]
  }
}

export default function createConfig(pkg) {
  return [configure(pkg.module), configure(pkg.main)]
}

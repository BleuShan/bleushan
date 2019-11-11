import autoExternal from 'rollup-plugin-auto-external'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import resolve from 'rollup-plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import {dirname, basename} from 'path'

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
      globals(),
      builtins(),
      autoExternal(),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
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

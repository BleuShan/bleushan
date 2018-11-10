## @bleushan/babel-preset-env

### About

This is a sane-ish attempt at adding some bells and whistles to [`@babel/preset-env`][1].
It integrates [`ant-design/babel-plugin-import`][2],
[`babel-preset-minify`][3]
and some commonjs module transforms as required by [`jest`][4]
test environment.

Out of the box it works [`@babel/preset-env`][1] with `spec`, `shippedProposals`
turned on and `useBuiltIns` set to `usage`. We also added
`@babel/plugin-proposal-optional-chaining`,
`@babel/plugin-proposal-class-properties` and `@babel/plugin-proposal-decorators`

### Usage

Configuration works as expected by [`@babel/preset-env`][1].
To accommodate the additions to the preset we added the following:

### Decorator support

Defaults to:

```json
{
  "preset": [
    "@bleushan/babel-preset-env"
    {
      "decorators": true,
      "decoratorsBeforeExport": true
    }
  ]
}
```

to turn on legacy behavior:

```json
{
  "preset": [
    "@bleushan/babel-preset-env"
    {
      "decorators": "legacy"
    }
  ]
}
```

#### babel-preset-minify

[`babel-preset-minify`][3], by default, is turned on configured with:

```json
{
  "preset": [
    "@bleushan/babel-preset-env"
    {
      "minify": {
        "keepFnName": true,
        "keepClassName": true
      }
    }
  ]
}
```

to turn it off:

```json
{
  "preset": [
    "@bleushan/babel-preset-env"
    {
      "minify": false
    }
  ]
}
```

It also accepts some per environment configuration like so:

```json
{
  "preset": [
    "@bleushan/babel-preset-env"
    {
      "minify": {
        "env": {
          "production": {
            "keepFnName": true,
            "keepClassName": true
          }
        }
      }
    }
  ]
}
```

This also turn off minification for all other environments. To turn it back on with our defaults:

```json
{
  "preset": [
    "@bleushan/babel-preset-env"
    {
      "minify": {
        "useDefaults": true,
        "env": {
          "production": {
            "keepFnName": false,
            "keepClassName": false
          }
        }
      }
    }
  ]
}
```

Or if you'd like use some baseline config:

```json
{
  "preset": [
    "@bleushan/babel-preset-env"
    {
      "minify": {
        "keepFnName": false,
        "keepClassName": false,
        "env": {
          "development": {
            "keepFnName": true,
            "keepClassName": true
          }
        }
      }
    }
  ]
}
```

For more information about configuration options see the [preset doc][3.1]

##### Caveats

- Minification is turned off on `test` environment because it messed up [`jest`][4] mocking.

#### ant-design/babel-plugin-import

By default we provide mappings for `ramda`, `lodash`, `lodash/fp` and `recompose`. To add an
entry:

```json
{
  "preset": [
    "@bleushan/babel-preset-env"
    {
      "import":  {
        "libraryName": "testLib",
        "libraryDirectory": "lib",
        "camel2DashComponentName": false
      }
    }
  ]
}
```

to add a bunch of entries:

```json
{
  "preset": [
    "@bleushan/babel-preset-env"
    {
      "import": [
        {
          "libraryName": "testLib",
          "libraryDirectory": "lib",
          "camel2DashComponentName": false
        },
        {
          "libraryName": "testLib2",
          "libraryDirectory": "lib",
          "camel2DashComponentName": false
        },
      ]
    }
  ]
}
```

Please refer to [`ant-design/babel-plugin-import`][2] for how to configure entries.

[1]: https://github.com/babel/babel/tree/master/packages/babel-preset-env
[2]: https://github.com/ant-design/babel-plugin-import
[3]: https://github.com/babel/minify/tree/master/packages/babel-preset-minify
[3.1]: https://github.com/babel/minify/tree/master/packages/babel-preset-minify#options
[4]: https://github.com/facebook/jest

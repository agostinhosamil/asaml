const { compilerOptions } = require('./jsconfig.json')
const { pathsToModuleAliases } = require('./vendor/console/helpers')

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '2012'
        }
      }
    ]
  ],

  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        alias: pathsToModuleAliases(compilerOptions.paths, { prefix: '.' })
      }
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread'
  ],

  ignore: [
    '**/*.spec.js'
  ]
}

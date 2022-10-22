const { _moduleAliases } = require('./package.json')

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
        alias: _moduleAliases
      }
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread'
  ],

  ignore: [
    '**/*.spec.js'
  ]
}

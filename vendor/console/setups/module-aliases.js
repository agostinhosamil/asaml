const path = require('path')
const moduleAlias = require('module-alias')

const { pathsToModuleAliases } = require('../helpers')

const rootDirPath = path.resolve(__dirname, '..', '..', '..')
const jsConfigFilePath = path.resolve(rootDirPath, 'jsconfig.json')

const { compilerOptions } = require(jsConfigFilePath)

const { paths, baseUrl } = compilerOptions

const aliasPaths = pathsToModuleAliases(paths, { prefix: baseUrl })

Object.keys(aliasPaths).forEach(aliasPath => {
  const aliasPathSource = typeof aliasPaths[aliasPath] !== typeof 'string'
    ? aliasPaths[aliasPath]
    : path.resolve(rootDirPath, aliasPaths[aliasPath])

  if (typeof aliasPathSource === 'function') {
    moduleAlias.addAlias(aliasPath, aliasPathSource({ rootDir: rootDirPath }))
  } else {
    moduleAlias.addAlias(aliasPath, aliasPathSource)
  }
})

moduleAlias()

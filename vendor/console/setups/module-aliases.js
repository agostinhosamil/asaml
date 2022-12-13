const path = require('path')
const moduleAlias = require('module-alias')

const { pathsToModuleAliases } = require('../helpers')

const __rootDir = path.resolve(__dirname, '..', '..', '..')

const { compilerOptions } = require(path.resolve(__rootDir, 'jsconfig.json'))

const { paths, baseUrl } = compilerOptions

const aliasPaths = pathsToModuleAliases(paths, { prefix: baseUrl })

Object.keys(aliasPaths).forEach(aliasPath => {
  const aliasPathSource = path.resolve(__rootDir, aliasPaths[aliasPath])

  moduleAlias.addAlias(aliasPath, aliasPathSource)
})

moduleAlias()

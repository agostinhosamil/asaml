import fs from 'fs'
import path from 'path'

import factory from 'factory-girl'

import config from '~/config'

const factoriesDirectoryPath = path.resolve(__dirname, 'factories')

const factoryFilesList = fs.readdirSync(factoriesDirectoryPath)

for (const factoryFile of factoryFilesList) {
  const factoryFilePath = path.resolve(__dirname, 'factories', factoryFile)
  const factoryModelFilePath = path.resolve(config.modelsPath, factoryFile)

  try {
    const factoryDefinitionContext = require(factoryFilePath)
    const factoryModelModule = require(factoryModelFilePath)
    const factoryModelModuleKeys = Object.keys(factoryModelModule)

    const factoryModel = factoryModelModule[factoryModelModuleKeys[0]]

    const factoryModelName = factoryModelModuleKeys[0]

    factory.define(
      factoryModelName,
      factoryModel,
      factoryDefinitionContext.default,
      factoryDefinitionContext.buildOptions || {}
    )
  } catch (e) {}
}

export default factory

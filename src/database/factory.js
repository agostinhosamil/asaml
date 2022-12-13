import path from 'path'

import config from '~/config'

import { Factory } from '@utils/Factory'

const factory = Factory.setupFactories({
  modelsPath: config.modelsPath,
  factoriesDirectoryPath: path.resolve(__dirname, 'factories')
})

export default factory

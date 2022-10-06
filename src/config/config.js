import path from 'path'

const rootPath = path.resolve (__dirname, '..');

export default {
  controllersPath: path.resolve (rootPath, 'app', 'controllers'),
  modelsPath: path.resolve (rootPath, 'app', 'models'),
  middlewaresPath: path.resolve (rootPath, 'app', 'middlewares'),
  helpersPath: path.resolve (rootPath, 'app', 'helpers')
}

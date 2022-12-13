exports.moduleAliasesToModuleNameMapper = (moduleAliases, options) => {
  const moduleNameMap = {}

  const pathPrefix = typeof options.prefix === typeof 'str' ? options.prefix.replace(/(\/)+$/, '') : ''

  if (typeof moduleAliases === 'object') {
    Object.keys(moduleAliases).forEach(moduleAlias => {
      const moduleAliasKeyRe = `^${moduleAlias}/(.*)$`
      const moduleAliasValue = `${pathPrefix}/${moduleAliases[moduleAlias].replace(/^(\.\/)+/, '')}/$1`

      moduleNameMap[moduleAliasKeyRe] = moduleAliasValue
    })
  }

  return moduleNameMap
}

exports.pathsToModuleAliases = (paths, options) => {
  const moduleAliases = {}
  const pathPrefix = typeof options.prefix === typeof 'str' ? options.prefix.replace(/(\/)+$/, '') : ''

  Object.keys(paths).forEach(aliasPath => {
    const aliasPathKey = aliasPath.replace(/\/\*$/, '')
    const aliasPathValue = paths[aliasPath][0]?.replace(/\/\*$/, '')

    const aliasPathSource = [pathPrefix, aliasPathValue].join('/')

    moduleAliases[aliasPathKey] = aliasPathSource
  })

  return moduleAliases
}

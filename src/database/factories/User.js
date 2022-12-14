import { faker } from '@faker-js/faker'

export const buildOptions = {
  afterCreate (model) {
    console.log('Created a user by the factory')

    return model
  }
}

export default () => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()

  return {
    name: [firstName, lastName].join(' '),
    email: faker.internet.email(firstName, lastName).toLowerCase(),
    password: faker.internet.password(12, true)
  }
}

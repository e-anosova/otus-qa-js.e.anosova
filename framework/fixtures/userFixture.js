import { parseSync } from '@babel/core'
import { faker } from '@faker-js/faker'

export function generateUserCredentials() {
  return {
    userName: faker.internet.username(),
    password: 'ValidPassword123!'
  }
}

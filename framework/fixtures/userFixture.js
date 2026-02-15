import { parseSync } from '@babel/core'
import { faker } from '@faker-js/faker'

export function generateUserCredentials() {
  return {
    userName: faker.internet.username(),
    password: 'ValidPassword123!',
    email: faker.internet.email()
  }
}

export const generateTwoBooksData = () => {
  const testIsbns = ['9781449325862', '9781449331818', '9781449337711', '9781449365035', '9781491904244']

  // Выбираем два РАЗНЫХ ISBN из существующих
  const shuffled = faker.helpers.shuffle([...testIsbns])

  return {
    firstIsbn: shuffled[0],
    secondIsbn: shuffled[1]
  }
}

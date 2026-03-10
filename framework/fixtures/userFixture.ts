import { faker } from '@faker-js/faker'

export interface UserCredentials {
  userName: string
  password: string
  email: string
}

export interface TwoBooksData {
  firstIsbn: string
  secondIsbn: string
}

//Генерирует данные для создания пользователя
export function generateUserCredentials() {
  return {
    userName: faker.internet.username(),
    password: 'ValidPassword123!'
  }
}

//Генерирует два разных ISBN из предопределенного списка
export const generateTwoBooksData = () => {
  const testIsbns = ['9781449325862', '9781449331818', '9781449337711', '9781449365035', '9781491904244']

  // Выбираем два РАЗНЫХ ISBN из существующих
  const [firstIsbn, secondIsbn] = faker.helpers.shuffle(testIsbns)
  return {
    firstIsbn,
    secondIsbn
  }
}

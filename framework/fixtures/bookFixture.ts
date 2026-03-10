import { faker } from '@faker-js/faker'

export interface BookData {
  isbn: string
  title: string
  author: string
}

export interface TwoBooksData {
  firstIsbn: string
  secondIsbn: string
}

//Генерирует данные для одной книги со случайным ISBN из предопределенного списка
export const generateBookData = () => {
  const testIsbns = ['9781449325862', '9781449331818', '9781449337711', '9781449365035', '9781491904244']

  return {
    isbn: faker.helpers.arrayElement(testIsbns),
    title: faker.commerce.productName(),
    author: faker.person.fullName()
  }
}

export const generateTwoBooksData = () => {
  const testIsbns = ['9781449325862', '9781449331818', '9781449337711', '9781449365035', '9781491904244']

  const shuffled = [...testIsbns].sort(() => Math.random() - 0.5)

  return {
    firstIsbn: shuffled[0],
    secondIsbn: shuffled[1]
  }
}

export const generateNonExistentIsbn = () => {
  return `978${Math.floor(Math.random() * 10000000000)}`
}

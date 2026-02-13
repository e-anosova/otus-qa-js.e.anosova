import { nameIsValid, fullTrim, getTotal } from './app.js'

describe('nameIsValid', () => {
  test('Return true for valid name', () => {
    expect(nameIsValid('kate')).toBe(true)
  })
  test('Return falce for number', () => {
    expect(nameIsValid(111)).toBe(false)
  })
  test('Return falce for name less than two characters long', () => {
    expect(nameIsValid('a')).toBe(false)
  })
  test('Return falce for symbols', () => {
    expect(nameIsValid('*$%')).toBe(false)
  })
})

describe('fullTrim', () => {
  test('Remove space', () => {
    expect(fullTrim('Test text for remove spases')).toBe('Testtextforremovespases')
  })
  test('Text without spases is not modified', () => {
    expect(fullTrim('Testtext')).toBe('Testtext')
  })
  test('Text with numbers', () => {
    expect(fullTrim('1 2 3')).toBe('123')
  })
})

const validCases = [
  {
    name: 'discount of 10%',
    items: [
      { quantity: 1, price: 10 },
      { quantity: 5, price: 20 }
    ],
    discount: 10,
    expected: 99
  },

  {
    name: 'without discont',
    items: [
      { quantity: 1, price: 10 },
      { quantity: 5, price: 20 }
    ],
    discount: 0,
    expected: 110
  }
]

const negativeCases = [
  {
    name: 'discount is not number',
    items: [
      { quantity: 1, price: 10 },
      { quantity: 5, price: 20 }
    ],
    discount: 'negativeCase',
    expected: Error('Скидка должна быть числом')
  },

  {
    name: 'invalid discont',
    items: [
      { quantity: 1, price: 10 },
      { quantity: 5, price: 20 }
    ],
    discount: 101,
    expected: Error('Процент скидки должен быть от 0 до 99')
  }
]

test.each(validCases)('%s', ({ items, discount, expected }) => {
  const result = getTotal(items, discount)
  expect(result).toEqual(expected)
})

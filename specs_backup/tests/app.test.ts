// @ts-expect-error TS(2307): Cannot find module './app.js' or its corresponding... Remove this comment to see the full error message
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
  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Return falce for symbols', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(nameIsValid('*$%')).toBe(false)
  })
})

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('fullTrim', () => {
  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Remove space', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(fullTrim('Test text for remove spases')).toBe('Testtextforremovespases')
  })
  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Text without spases is not modified', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(fullTrim('Testtext')).toBe('Testtext')
  })
  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Text with numbers', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
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

// @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test.each(validCases)('%s', ({
  items,
  discount,
  expected
}: any) => {
  const result = getTotal(items, discount)
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(result).toEqual(expected)
})

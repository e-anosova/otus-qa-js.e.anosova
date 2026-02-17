import { addListOfBooks, deleteBook, getBook, updateBook } from '../../../framework/services/bookService.js'
import { createUser, generateToken, deleteUser } from '../../../framework/services/userService.js'
import { generateUserCredentials } from '../../../framework/fixtures/userFixture.js'
import {
  generateBookData,
  generateTwoBooksData,
  generateNonExistentIsbn
} from '../../../framework/fixtures/bookFixture.js'

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Books API Tests', () => {
  let testUser
  let testUserId: any
  let testToken: any

  // @ts-expect-error TS(2304): Cannot find name 'beforeAll'.
  beforeAll(async () => {
    const userData = generateUserCredentials()
    console.log('Creating user with data:', userData)

    testUser = await createUser(userData)
    console.log('User created:', testUser)

    // @ts-expect-error TS(2339): Property 'userID' does not exist on type 'AxiosRes... Remove this comment to see the full error message
    testUserId = testUser.userID || testUser.id
    testToken = await generateToken(userData)
    console.log('Token generated:', testToken)
  }, 30000)

  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Успешное создание книги', async () => {
    const bookData = generateBookData()
    console.log('bookData:', bookData)

    const isbn = bookData.isbn
    console.log('isbn:', isbn)

    const response = await addListOfBooks(testUserId, isbn, testToken)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.status).toBe(201)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.books).toBeDefined()
  })

  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Метод создания книги возвращает 401 ошибку неавторизованному пользователю', async () => {
    // @ts-expect-error TS(2339): Property 'isbn' does not exist on type '() => { is... Remove this comment to see the full error message
    const isbn = generateBookData.isbn

    const response = await addListOfBooks(testUserId, isbn, undefined)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.status).toBe(401)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.message).toBe('User not authorized!')
  })

  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Метод создания книги возвращает 400 ошибку при отправки пустого ISBN', async () => {
    const isbn = ''

    const response = await addListOfBooks(testUserId, isbn, undefined)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.status).toBe(401)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.message).toBe('User not authorized!')
  })

  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Метод обновления книги отрабатывает успешно', async () => {
    const { firstIsbn, secondIsbn } = generateTwoBooksData()
    console.log('Testing with ISBNs:', { firstIsbn, secondIsbn })

    const addResponse = await addListOfBooks(testUserId, firstIsbn, testToken)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(addResponse.status).toBe(201)

    const response = await updateBook(firstIsbn, testUserId, testToken, secondIsbn)

    console.log('Update response:', response.data)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.status).toBe(200)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.books[0].isbn).toBe(secondIsbn)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.books).toHaveLength(1)
  })

  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Метод обновления книги возвращает 401 для пустого пользователя', async () => {
    const { firstIsbn, secondIsbn } = generateTwoBooksData()
    console.log('Testing with ISBNs:', { firstIsbn, secondIsbn })

    const addResponse = await addListOfBooks(testUserId, firstIsbn, testToken)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(addResponse.status).toBe(201)
    testUserId = ' '
    const response = await updateBook(firstIsbn, testUserId, testToken, secondIsbn)

    console.log('Update response:', response.data)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.status).toBe(401)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.message).toBe('User Id not correct!')
  })

  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Метод обновления книги возвращает 400 для некорректного ISBN', async () => {
    let { firstIsbn, secondIsbn } = generateTwoBooksData()
    console.log('Testing with ISBNs:', { firstIsbn, secondIsbn })

    const addResponse = await addListOfBooks(testUserId, firstIsbn, testToken)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(addResponse.status).toBe(201)
    secondIsbn = 'incorrect ISBN'
    const response = await updateBook(firstIsbn, testUserId, testToken, secondIsbn)

    console.log('Update response:', response.data)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.status).toBe(400)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.message).toBe('ISBN supplied is not available in Books Collection!')
  })

  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Метод GET возвращает информацию по книге', async () => {
    const bookData = generateBookData()
    const isbn = bookData.isbn

    console.log('ISBN:', isbn)

    const addResponse = await addListOfBooks(testUserId, isbn, testToken)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(addResponse.status).toBe(201)

    const response = await getBook(isbn)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.status).toBe(200)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data).toBeDefined()
  })

  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Метод GET возвращает ошибку при запросе несуществующей книги', async () => {
    const nonExistentIsbn = '462465246'
    console.log('Testing with non-existent ISBN:', nonExistentIsbn)

    const response = await getBook(nonExistentIsbn)
    console.log(response.data)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.status).toBe(400)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.message).toBe('ISBN supplied is not available in Books Collection!')
  })

  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Метод удаления книги отрабатывает успешно', async () => {
    const bookData = generateBookData()
    const isbn = bookData.isbn

    const response = await deleteBook(isbn, testUserId, testToken)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.status).toBe(204)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.books).toBe(null)
  }, 15000)

  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Метод уладения книги возвращает 401 ошибку неавторизованному пользователю', async () => {
    const bookData = generateBookData()
    const isbn = bookData.isbn
    const wrongToken = ' '

    const response = await deleteBook(isbn, testUserId, wrongToken)
    // @ts-expect-error TS(2345): Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
    setTimeout(10000)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.status).toBe(401)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.message).toBe('User not authorized!')
  })

  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Метод уладения книги возвращает 400 ошибку при попытке удалить несуществующую книгу', async () => {
    const bookData = generateBookData()
    const isbn = '451641633633'

    const response = await deleteBook(isbn, testUserId, testToken)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.status).toBe(400)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.message).toBe('ISBN supplied is not available in Books Collection!')
  }, 10000)
})

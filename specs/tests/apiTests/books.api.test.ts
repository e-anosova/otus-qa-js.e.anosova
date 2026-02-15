import { addListOfBooks, deleteBook, getBook, updateBook } from '../../../framework/services/bookService.js'
import { createUser, generateToken, deleteUser } from '../../../framework/services/userService.js'
import { generateUserCredentials } from '../../../framework/fixtures/userFixture.js'
import {
  generateBookData,
  generateTwoBooksData,
  generateNonExistentIsbn
} from '../../../framework/fixtures/bookFixture.js'

describe('Books API Tests', () => {
  let testUser
  let testUserId
  let testToken

  beforeAll(async () => {
    const userData = generateUserCredentials()
    console.log('Creating user with data:', userData)

    testUser = await createUser(userData)
    console.log('User created:', testUser)

    testUserId = testUser.userID || testUser.id
    testToken = await generateToken(userData)
    console.log('Token generated:', testToken)
  }, 30000)

  test('Успешное создание книги', async () => {
    const bookData = generateBookData()
    console.log('bookData:', bookData)

    const isbn = bookData.isbn
    console.log('isbn:', isbn)

    const response = await addListOfBooks(testUserId, isbn, testToken)

    expect(response.status).toBe(201)
    expect(response.data.books).toBeDefined()
  })

  test('Метод создания книги возвращает 401 ошибку неавторизованному пользователю', async () => {
    const isbn = generateBookData.isbn

    const response = await addListOfBooks(testUserId, isbn, undefined)

    expect(response.status).toBe(401)
    expect(response.data.message).toBe('User not authorized!')
  })

  test('Метод создания книги возвращает 400 ошибку при отправки пустого ISBN', async () => {
    const isbn = ''

    const response = await addListOfBooks(testUserId, isbn, undefined)

    expect(response.status).toBe(401)
    expect(response.data.message).toBe('User not authorized!')
  })

  test('Метод обновления книги отрабатывает успешно', async () => {
    const { firstIsbn, secondIsbn } = generateTwoBooksData()
    console.log('Testing with ISBNs:', { firstIsbn, secondIsbn })

    const addResponse = await addListOfBooks(testUserId, firstIsbn, testToken)
    expect(addResponse.status).toBe(201)

    const response = await updateBook(firstIsbn, testUserId, testToken, secondIsbn)

    console.log('Update response:', response.data)

    expect(response.status).toBe(200)
    expect(response.data.books[0].isbn).toBe(secondIsbn)
    expect(response.data.books).toHaveLength(1)
  })

  test('Метод обновления книги возвращает 401 для пустого пользователя', async () => {
    const { firstIsbn, secondIsbn } = generateTwoBooksData()
    console.log('Testing with ISBNs:', { firstIsbn, secondIsbn })

    const addResponse = await addListOfBooks(testUserId, firstIsbn, testToken)
    expect(addResponse.status).toBe(201)
    testUserId = ' '
    const response = await updateBook(firstIsbn, testUserId, testToken, secondIsbn)

    console.log('Update response:', response.data)

    expect(response.status).toBe(401)
    expect(response.data.message).toBe('User Id not correct!')
  })

  test('Метод обновления книги возвращает 400 для некорректного ISBN', async () => {
    let { firstIsbn, secondIsbn } = generateTwoBooksData()
    console.log('Testing with ISBNs:', { firstIsbn, secondIsbn })

    const addResponse = await addListOfBooks(testUserId, firstIsbn, testToken)
    expect(addResponse.status).toBe(201)
    secondIsbn = 'incorrect ISBN'
    const response = await updateBook(firstIsbn, testUserId, testToken, secondIsbn)

    console.log('Update response:', response.data)

    expect(response.status).toBe(400)
    expect(response.data.message).toBe('ISBN supplied is not available in Books Collection!')
  })

  test('Метод GET возвращает информацию по книге', async () => {
    const bookData = generateBookData()
    const isbn = bookData.isbn

    console.log('ISBN:', isbn)

    const addResponse = await addListOfBooks(testUserId, isbn, testToken)
    expect(addResponse.status).toBe(201)

    const response = await getBook(isbn)
    expect(response.status).toBe(200)
    expect(response.data).toBeDefined()
  })

  test('Метод GET возвращает ошибку при запросе несуществующей книги', async () => {
    const nonExistentIsbn = '462465246'
    console.log('Testing with non-existent ISBN:', nonExistentIsbn)

    const response = await getBook(nonExistentIsbn)
    console.log(response.data)
    expect(response.status).toBe(400)
    expect(response.data.message).toBe('ISBN supplied is not available in Books Collection!')
  })

  test('Метод удаления книги отрабатывает успешно', async () => {
    const bookData = generateBookData()
    const isbn = bookData.isbn

    const response = await deleteBook(isbn, testUserId, testToken)

    expect(response.status).toBe(204)
    expect(response.data.books).toBe(null)
  }, 15000)

  test('Метод уладения книги возвращает 401 ошибку неавторизованному пользователю', async () => {
    const bookData = generateBookData()
    const isbn = bookData.isbn
    const wrongToken = ' '

    const response = await deleteBook(isbn, testUserId, wrongToken)
    setTimeout(10000)

    expect(response.status).toBe(401)
    expect(response.data.message).toBe('User not authorized!')
  })

  test('Метод уладения книги возвращает 400 ошибку при попытке удалить несуществующую книгу', async () => {
    const bookData = generateBookData()
    const isbn = '451641633633'

    const response = await deleteBook(isbn, testUserId, testToken)

    expect(response.status).toBe(400)
    expect(response.data.message).toBe('ISBN supplied is not available in Books Collection!')
  }, 10000)
})

import { addListOfBooks, deleteBook, getBook, updateBook } from '../../../framework/services/bookService'
import { createUser, generateToken, deleteUser } from '../../../framework/services/userService'
import { generateUserCredentials } from '../../../framework/fixtures/userFixture'
import {
  generateBookData,
  generateTwoBooksData,
  generateNonExistentIsbn
} from '../../../framework/fixtures/bookFixture'


interface UserResponse {
  userID?: string;
  id?: string;
  userName?: string;
  books?: any[];
}

interface UserCredentials {
  userName: string;
  password: string;
}
interface CreateUserRequest {
  userName: string;
  password: string;
}
interface Book {
  isbn: string;
  title: string;
  author: string;
}

interface AddBookResponse {
  message?: string;
  code?: string;
  books?: Book[];
}

describe('Books API Tests', () => {
  let testUser: UserResponse;
  let testUserId: string;
  let testToken: string;
  let userCredentials: UserCredentials;
  let isbn: string;


 beforeAll(async () => {
    userCredentials = generateUserCredentials();
    console.log('📝 User credentials:', userCredentials);

    const createResponse = await createUser(userCredentials);
    testUser = createResponse.data as UserResponse;
    testUserId = testUser.userID || testUser.id || '';
    console.log('👤 User ID:', testUserId);


    const generatedToken = await generateToken({
      userName: userCredentials.userName,
      password: userCredentials.password
    });
    
    testToken = generatedToken;

    expect(testToken).toBeDefined();
    expect(testToken.length).toBeGreaterThan(0);
  }, 30000);

  test('Успешное создание книги', async () => {
    const bookData = generateBookData()
    console.log('bookData:', bookData)

    const isbn = bookData.isbn
    console.log('isbn:', isbn)

    const response = await addListOfBooks(testUserId, isbn, testToken)

    expect(response.status).toBe(201)
  })

  test('Метод создания книги возвращает 401 ошибку неавторизованному пользователю', async () => {
    const bookData = generateBookData();
    const invalidToken = '  ';
    const response = await addListOfBooks(testUserId, bookData.isbn, invalidToken); 
    const responseData = response.data as AddBookResponse; 

    expect(response.status).toBe(401)
    expect(responseData.message).toBe('User not authorized!')
  })

  test('Метод создания книги возвращает 400 ошибку при отправки пустого ISBN', async () => {
    const { firstIsbn, secondIsbn } = generateTwoBooksData()
    console.log('Testing with ISBNs:', { firstIsbn, secondIsbn })

    const addResponse = await addListOfBooks(testUserId, firstIsbn, testToken)
    expect(addResponse.status).toBe(201)
    testUserId = ' '
    const response = await updateBook(firstIsbn, testUserId, testToken, secondIsbn)
    const responseData = response.data as AddBookResponse; 
    console.log('Update response:', response.data)

    expect(response.status).toBe(401)
    expect(responseData.message).toBe('User Id not correct!')
  })

  test('Метод обновления книги отрабатывает успешно', async () => {
    const { firstIsbn, secondIsbn } = generateTwoBooksData()
    console.log('Testing with ISBNs:', { firstIsbn, secondIsbn })

    const addResponse = await addListOfBooks(testUserId, firstIsbn, testToken)
    expect(addResponse.status).toBe(201)

    const response = await updateBook(firstIsbn, testUserId, testToken, secondIsbn)
    const responseData = response.data as AddBookResponse; 
    console.log('Update response:', response.data)

    expect(response.status).toBe(200)
    expect(responseData.books).toBeDefined();
    expect(responseData.books).not.toBeUndefined();
    expect(responseData.books?.[0]?.isbn).toBe(secondIsbn)
    expect(responseData.books).toHaveLength(1)
  })

  test('Метод обновления книги возвращает 401 для неавторизованного', async () => {
   const { firstIsbn, secondIsbn } = generateTwoBooksData()
    console.log('Testing with ISBNs:', { firstIsbn, secondIsbn })

    const addResponse = await addListOfBooks(testUserId, firstIsbn, testToken)
    expect(addResponse.status).toBe(201)

    testToken = ''
    const response = await updateBook(firstIsbn, testUserId, testToken, secondIsbn)
    const responseData = response.data as AddBookResponse; 
    console.log('Update response:', response.data)

    expect(response.status).toBe(401)
    expect(responseData.message).toBe('User not authorized!')
  })

  test('Метод обновления книги возвращает 400 для некорректного ISBN', async () => {
    let { firstIsbn, secondIsbn } = generateTwoBooksData()
    console.log('Testing with ISBNs:', { firstIsbn, secondIsbn })

    const addResponse = await addListOfBooks(testUserId, firstIsbn, testToken)
    expect(addResponse.status).toBe(201)
    secondIsbn = 'incorrect ISBN', testUserId, testToken, secondIsbn;
    const response = await updateBook(firstIsbn, testUserId, testToken, secondIsbn)
    const responseData = response.data as AddBookResponse; 

    console.log('Update response:', response.data)

    expect(response.status).toBe(400)
    expect(responseData.message).toBe('ISBN supplied is not available in Books Collection!')
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
    const responseData = response.data as AddBookResponse; 
    console.log(response.data)
    expect(response.status).toBe(400)
    expect(responseData.message).toBe('ISBN supplied is not available in Books Collection!')
  })

  test('Метод удаления книги отрабатывает успешно', async () => {
    const bookData = generateBookData()
    const isbn = bookData.isbn

    const response = await deleteBook(isbn, testUserId, testToken)
    const responseData = response.data as AddBookResponse; 

    expect(response.status).toBe(204)
    expect(responseData.books).toBe(null)
  }, 15000)

  test('Метод уладения книги возвращает 401 ошибку неавторизованному пользователю', async () => {
    const bookData = generateBookData()
    const isbn = bookData.isbn
    const wrongToken = ' '

    const response = await deleteBook(isbn, testUserId, wrongToken)
    const responseData = response.data as AddBookResponse; 

    expect(response.status).toBe(401)
    expect(responseData.message).toBe('User not authorized!')
  })

  test('Метод уладения книги возвращает 400 ошибку при попытке удалить несуществующую книгу', async () => {
    const bookData = generateBookData()
    const isbn = '451641633633'

    const response = await deleteBook(isbn, testUserId, testToken)
    const responseData = response.data as AddBookResponse; 

    expect(response.status).toBe(400)
    expect(responseData.message).toBe('ISBN supplied is not available in Books Collection!')
  }, 10000)
})

import axios from 'axios'
import { generateUserCredentials } from '../../../framework/fixtures/userFixture.js'
import {
  createUser,
  generateToken,
  authorizeUser,
  getUser,
  deleteUser
} from '../../../framework/services/userService.js'
import { en_CA } from '@faker-js/faker'

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Создание пользователя', () => {
  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Метод создания пользователя возвращает ошибку 406 для занятого логина', async () => {
    const userData = generateUserCredentials()

    const firstResponse = await createUser({
      userName: userData.userName,
      password: userData.password
    })

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(firstResponse.status).toBe(201)

    const secondResponse = await createUser({
      userName: userData.userName,
      password: userData.password
    })

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(secondResponse.status).toBe(406)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(secondResponse.data.code).toBe('1204')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(secondResponse.data.message).toBe('User exists!')
  })

  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Метод создания пользователя возвращает ошибку при неправильном пароле', async () => {
    const userData = generateUserCredentials()

    const userName = userData.userName
    const password = '12345'

    const response = await createUser({ userName, password })

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.status).toBe(400)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.code).toBe('1300')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.message).toBe(
      "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."
    )
  })

  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Метод создания пользователя отрабатывает успешно', async () => {
    const userData = generateUserCredentials()

    const userName = userData.userName
    const password = userData.password

    const response = await createUser({ userName, password })

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.status).toBe(201)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.userID).toBeTruthy
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.username).toEqual(userName)
  })
})

// describe('Метод генерации токена', () => {
//   test('Успешная генерация токена', async () => {
//     const userData = generateUserCredentials();
//     const userName = userData.userName;
//       const password = userData.password;

//     const response = await generateToken({userName, password });

//   expect(response.status).toEqual(200);

//     // Проверяем структуру ответа (согласно документации)
//     expect(response.data).toHaveProperty('token');
//     expect(response.data).toHaveProperty('expires');
//     expect(response.data).toHaveProperty('status');
//     expect(response.data).toHaveProperty('result');
//       }
//     )

//   test('Generation error', async () => {
//     const responce = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         userName: '',
//         password: ''
//       })
//     })
//     const data = await responce.json()

//     expect(responce.status).toEqual(400)
//     expect(data.message).toBe('UserName and Password required.')
//   })
// })

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Авторизация', () => {
  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Успешная авторизация', async () => {
    const userData = generateUserCredentials()

    const userName = userData.userName
    const password = userData.password

    const firstResponse = await createUser({
      userName: userData.userName,
      password: userData.password
    })
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(firstResponse.status).toBe(201)

    const secondResponse = await authorizeUser({ userName, password })

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(secondResponse.status).toBe(200)
  })

  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Юзер и пароль обязательны', async () => {
    const userName = ' '
    const password = ' '

    const response = await authorizeUser({ userName, password })

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.status).toBe(404)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.code).toBe('1207')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.message).toBe('User not found!')
  })
})

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Успешное удаление пользователя', () => {
  let authToken: any
  let userId: any

  // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
  beforeEach(async () => {
    //создание пользователя для удаления
    const userData = generateUserCredentials()

    const userName = userData.userName
    const password = userData.password

    const createUserResponse = await createUser({ userName, password })
    userId = createUserResponse.data.userID

    //генерация токена
    const tokenResponse = await generateToken({ userName, password })
    authToken = tokenResponse
  })

  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Успешное удаление пользователя', async () => {
    const response = await deleteUser(userId, authToken)
    {
      ;`Bearer ${authToken}`
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.status).toBe(204)
  })

  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Невозможно удалить неавторизованного пользователя', async () => {
    authToken = ' '
    const response = await deleteUser(userId, authToken)

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.status).toBe(401)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.message).toBe('User not authorized!')
  })

  // @ts-expect-error TS(2593): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('Пользователь для удаления не найден', async () => {
    userId = '1111111111111'
    const response = await deleteUser(userId, authToken)
    {
      ;`Bearer ${authToken}`
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.status).toBe(200)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.code).toBe('1207')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.data.message).toBe('User Id not correct!')
  })
})

// describe('Невозможно удалить пользователя без авторизации', () => {
//   let authToken
//   let userId

//   beforeAll(async () => {
//     const userData = generateUserCredentials()
//     const createUser = await axios.post(`${config.baseURL}Account/v1/User`, {
//       userName: userData.userName,
//       password: userData.password
//     })
//     userId = createUser.data.userID
//     console.log('ID созданного пользователя:', userId)

//     const tokenResponse = await axios.post(`${config.baseURL}Account/v1/GenerateToken`, {
//       userName: userData.userName,
//       password: userData.password
//     })
//     console.log(' Токен получен')
//     console.log('Ответ от API:', JSON.stringify(tokenResponse.data, null, 2))
//     authToken = tokenResponse.data.token
//   })

// })

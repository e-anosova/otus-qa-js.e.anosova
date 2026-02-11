import axios from 'axios'
import config from '../../framework/config/config.js'
import { generateUserCredentials } from '../../framework/fixtures/userFixture.js'

const client = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true,
})

describe('Тестирование API пользователя', () => {
  let userId
  let authToken
  let testUserData

  beforeAll(async () => {
    // Создаем пользователя для тестов удаления
    testUserData = generateUserCredentials()
    const createUser = await axios.post(`${config.baseURL}Account/v1/User`, {
      userName: testUserData.userName,
      password: testUserData.password
    })
    userId = createUser.data.userID
    console.log('ID созданного пользователя:', userId)

    // Получаем токен для авторизации
    const tokenResponse = await axios.post(`${config.baseURL}Account/v1/GenerateToken`, {
      userName: testUserData.userName,
      password: testUserData.password
    })
    authToken = tokenResponse.data.token
    console.log('Токен получен')
  })

  // Тесты создания пользователя
  test('Ошибка создания пользователя: логин уже используется', async () => {
    const response = await fetch(`${config.baseURL}Account/v1/User`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'TestUserName',
        password: 'TestPass1!'
      })
    })
    const data = await response.json()

    expect(response.status).toEqual(406)
    expect(data.code).toBe('1204')
    expect(data.message).toBe('User exists!')
  })

  test('Ошибка создания пользователя: неверный пароль', async () => {
    const response = await fetch(`${config.baseURL}Account/v1/User`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'TestUser1',
        password: 'Testpass' // Пароль без заглавных букв и спецсимволов
      })
    })
    const data = await response.json()

    expect(response.status).toEqual(400)
    expect(data.code).toBe('1300')
    expect(data.message).toContain('Passwords must have at least one')
  })

  test('Успешное создание пользователя', async () => {
    const uniqueUsername = `UserName${Date.now()}`
    const response = await fetch(`${config.baseURL}Account/v1/User`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: uniqueUsername,
        password: 'TestPass1!'
      })
    })
    const data = await response.json()

    expect(response.status).toEqual(201)
    expect(data.username).toBe(uniqueUsername)
  })

  // Тесты удаления пользователя
  test('Успешное удаление пользователя', async () => {
    const response = await client.delete(`${config.baseURL}Account/v1/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    expect(response.status).toBe(204)
  })

  test('Невозможно удалить пользователя без авторизации', async () => {
    // Создаем нового пользователя для этого теста
    const newUserData = generateUserCredentials()
    const createUser = await client.post(`${config.baseURL}Account/v1/User`, {
      userName: newUserData.userName,
      password: newUserData.password
    })
    const newUserId = createUser.data.userID
    
    // Пытаемся удалить без токена авторизации
    const response = await client.delete(`${config.baseURL}Account/v1/User/${newUserId}`, {})
    
    expect(response.status).toBe(401)
    expect(response.data.message).toBe('User not authorized!')
    
    // Очистка: удаляем пользователя с токеном (если тест не прошел)
    const tokenResponse = await client.post(`${config.baseURL}Account/v1/GenerateToken`, {
      userName: newUserData.userName,
      password: newUserData.password
    })
    const newUserToken = tokenResponse.data.token
    
    await client.delete(`${config.baseURL}Account/v1/User/${newUserId}`, {
      headers: {
        Authorization: `Bearer ${newUserToken}`
      }
    }).catch(() => {})
  })
})
import axios from 'axios'
import config from '../../framework/config/config.js'
import { generateUserCredentials } from '../../framework/fixtures/userFixture.js'

describe('Create user', () => {
  test('Create user: login is already used', async () => {
    const responce = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'TestUserName',
        password: 'TestPass1!'
      })
    })
    const data = await responce.json()

    expect(responce.status).toEqual(406)
    expect(data.code).toBe('1204')
    expect(data.message).toBe('User exists!')
  })
  test('Create user: password is invalid', async () => {
    const responce = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'TestUser1',
        password: 'Testpass'
      })
    })
    const data = await responce.json()

    expect(responce.status).toEqual(400)
    expect(data.code).toBe('1300')
    expect(data.message).toBe(
      "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."
    )
  })
  test('Create user: succes', async () => {
    const responce = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'UserName123',
        password: 'TestPass1!'
      })
    })
    const data = await responce.json()

    expect(responce.status).toEqual(201)
    expect(data.username).toBe('UserName1')
  })
})

describe('Generate tocken', () => {
  test('Generation successful', async () => {
    const responce = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'UserName1',
        password: 'TestPass1!'
      })
    })
    const data = await responce.json()

    expect(responce.status).toEqual(200)
    expect(data.token).toBeTruthy
  })
  test('Generation error', async () => {
    const responce = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: '',
        password: ''
      })
    })
    const data = await responce.json()

    expect(responce.status).toEqual(400)
    expect(data.message).toBe('UserName and Password required.')
  })
})

describe('Авторизация', () => {
  test('Успешная авторизация', async () => {
    const url = `${config.baseURL}/Account/v1/Authorized`
    const responce = await axios.post(url, {
      userName: config.username,
      password: config.password
    })
    expect(responce.status).toBe(200)
  })
  test('Юзер и пароль обязательны', async () => {
    const url = `${config.baseURL}/Account/v1/Authorized`
    const responce = await axios.post(url, {
      userName: '',
      password: ''
    })
    expect(responce.status).toBe(400)
    expect(responce.data.code).toBe('1200')
    expect(responce.data.message).toBe('UserName and Password required.')
  })
  test('Юзер и пароль обязательны', async () => {
    const url = `${config.baseURL}/Account/v1/Authorized`
    const responce = await axios.post(url, {
      userName: '123',
      password: '456'
    })
    expect(responce.status).toBe(404)
    expect(responce.data.code).toBe('1207')
    expect(responce.data.message).toBe('User not found!')
  })
})

describe('Получение информации о пользователе', () => {
  let userId
  let authToken
  let userName

  beforeAll(async () => {
    const userData = generateUserCredentials()
    const createUser = await axios.post(`${config.baseURL}Account/v1/User`, {
      userName: userData.userName,
      password: userData.password
    })
    userId = createUser.data.userID

    const tokenResponse = await axios.post(`${config.baseURL}Account/v1/GenerateToken`, {
      userName: userData.userName,
      password: userData.password
    })
    authToken = tokenResponse.data.token
  })
})

describe('Успешное удаление пользователя', () => {
  let authToken
  let userId

  beforeAll(async () => {
    const userData = generateUserCredentials()
    const createUser = await axios.post(`${config.baseURL}Account/v1/User`, {
      userName: userData.userName,
      password: userData.password
    })
    userId = createUser.data.userID
    console.log('ID созданного пользователя:', userId)

    const tokenResponse = await axios.post(`${config.baseURL}Account/v1/GenerateToken`, {
      userName: userData.userName,
      password: userData.password
    })
    authToken = tokenResponse.data.token
  })

  test('Успешное удаление пользователя', async () => {
    const response = await axios.delete(`${config.baseURL}Account/v1/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    expect(response.status).toBe(204)
  })
})

describe('Невозможно удалить пользователя без авторизации', () => {
  let authToken
  let userId

  beforeAll(async () => {
    const userData = generateUserCredentials()
    const createUser = await axios.post(`${config.baseURL}Account/v1/User`, {
      userName: userData.userName,
      password: userData.password
    })
    userId = createUser.data.userID
    console.log('ID созданного пользователя:', userId)

    const tokenResponse = await axios.post(`${config.baseURL}Account/v1/GenerateToken`, {
      userName: userData.userName,
      password: userData.password
    })
    console.log(' Токен получен')
    console.log('Ответ от API:', JSON.stringify(tokenResponse.data, null, 2))
    authToken = tokenResponse.data.token
  })

  test('Невозможно удалить пользователя без авторизации', async () => {
    const response = await axios.delete(`${config.baseURL}Account/v1/User/${userId}`, {})
    console.log(response.data)
    expect(response.status).toBe(401)
    expect(response.message).toBe('User not authorized!')
  })
})

import axios from 'axios'
const client = axios.create({
 baseURL: config.baseURL,
 validateStatus: () => true,
})
import config from '../../framework/config/config.js'
import { generateUserCredentials } from '../../framework/fixtures/userFixture.js'

describe('Тестирование API юзера', () => {
  let userId
  let authToken
  let testUserData
  

  beforeAll(async () => {
    const userData = generateUserCredentials()
    const createUser = await client.post(`${config.baseURL}Account/v1/User`, {
      userName: userData.userName,
      password: userData.password
    })
    userId = createUser.data.userID

    const tokenResponse = await client.post(`${config.baseURL}Account/v1/GenerateToken`, {
      userName: userData.userName,
      password: userData.password
    })
    authToken = tokenResponse.data.token
  })


test('Успешное создание пользователя', async () => {
    const newUserData = generateUserCredentials()
    const response = await client.post('/Account/v1/User', {
      userName: newUserData.userName, 
      password: newUserData.password
    })
    
    expect(response.status).toEqual(201)
    expect(response.data.userID).toBeTruthy()
    expect(response.data.username).toEqual(newUserData.userName)
  })


    test('Ошибка создания пользователя: логин уже используется', async () => {
    const response = await client.post('/Account/v1/User', {
      userName: 'TestUserName',
      password: 'TestPass1!'
    })
    
    expect(response.status).toEqual(406)
    expect(response.data.code).toBe('1204')
    expect(response.data.message).toBe('User exists!')
  })

  test('Ошибка создания пользователя:неверный пароль', async () => {
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

test('Невозможно удалить пользователя без авторизации', async () => {
    // Создаем нового пользователя
    const newUserForDeletion = generateUserCredentials()
    const createResponse = await client.post('/Account/v1/User', {
      userName: newUserForDeletion.userName,
      password: newUserForDeletion.password
    })
    })
})
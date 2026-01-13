describe('Create user', () => {
    test('Create user: login is already used', async () => {
        const responce = await fetch ( 'https://bookstore.demoqa.com/Account/v1/User', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify ({
            userName: 'TestUserName',
            password: 'TestPass1!',
        })
    })
    const data = await responce.json()

    expect(responce.status).toEqual(406)
    expect(data.code).toBe('1204')
    expect(data.message).toBe('User exists!')
    })
     test('Create user: password is invalid', async () => {
        const responce = await fetch ( 'https://bookstore.demoqa.com/Account/v1/User', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify ({
            userName: 'TestUser1',
            password: 'Testpass',
        })
    })
    const data = await responce.json()

    expect(responce.status).toEqual(400)
    expect(data.code).toBe('1300')
    expect(data.message).toBe('Passwords must have at least one non alphanumeric character, one digit (\'0\'-\'9\'), one uppercase (\'A\'-\'Z\'), one lowercase (\'a\'-\'z\'), one special character and Password must be eight characters or longer.')
    })
    test('Create user: succes', async () => {
        const responce = await fetch ( 'https://bookstore.demoqa.com/Account/v1/User', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify ({
            userName: 'UserName123',
            password: 'TestPass1!',
        })
    })
    const data = await responce.json()

    expect(responce.status).toEqual(201)
    expect(data.username).toBe('UserName1')
    })
})

describe('Generate tocken', () => {
    test('Generation successful', async() => {
        const responce = await fetch ( 'https://bookstore.demoqa.com/Account/v1/GenerateToken', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify ({
            userName: 'UserName1',
            password: 'TestPass1!'
        })
        
    })
     const data = await responce.json()

    expect(responce.status).toEqual(200)
    expect(data.token).toBeTruthy
})
    test('Generation error', async() => {
        const responce = await fetch ( 'https://bookstore.demoqa.com/Account/v1/GenerateToken', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify ({
            userName: '',
            password: ''
        })
        
    })
     const data = await responce.json()

    expect(responce.status).toEqual(400)
    expect(data.message).toBe('UserName and Password required.')
})
})
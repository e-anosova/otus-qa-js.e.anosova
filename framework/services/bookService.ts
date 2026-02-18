import axios from 'axios'
import { httpGet, httpPost, httpPut, httpDelete, withAuth } from './baseService'

export const addListOfBooks = async (userId: any, isbn: any, token: any) => {
  const response = await httpPost(
    '/BookStore/v1/Books',
    {
      userId: userId,
      collectionOfIsbns: [
        {
          isbn: isbn
        }
      ]
    },
    token ? withAuth(token) : {}
  )
  const requestBody = {
    userId: userId,
    collectionOfIsbns: [
      {
        isbn: isbn
      }
    ]
  }
  console.log('Request body:', JSON.stringify(requestBody, null, 2))
  return response
}

export const deleteBook = async (isbn: any, userId: any, token: any) => {
  const config = {
    params: {
      ISBN: isbn,
      UserId: userId
    }
  }

  const response = await httpDelete('/BookStore/v1/Book', token ? { ...config, ...withAuth(token) } : config)
  return response
}

export const getBook = async (isbn: any) => {
  const config = {
    params: { ISBN: isbn },
    headers: {
      accept: 'application/json'
    }
  }
  const response = await httpGet('/BookStore/v1/Book', config)
  return response
}

export const updateBook = async (oldIsbn: any, userId: any, token: any, newIsbn: any) => {
  const response = await httpPut(
    `/BookStore/v1/Books/${oldIsbn}`,
    {
      userId: userId,
      isbn: newIsbn
    },
    withAuth(token)
  )
  return response
}

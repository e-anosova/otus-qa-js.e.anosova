import axios from 'axios'
import config from '../config/config'

const createClient = (baseURL = 'https://bookstore.demoqa.com') => {
  return axios.create({
    baseURL: baseURL,
    validateStatus: () => true,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
}
const client = createClient()

export const httpPost = async (url: any, data: any, config = {}) => {
  const response = await client.post(url, data, config)
  return response
}

export const httpGet = async (url: any, config = {}) => {
  const response = await client.get(url, config)
  return response
}

export const httpDelete = async (url: any, config = {}) => {
  const response = await client.delete(url, config)
  return response
}

export const httpPut = async (url: any, data: any, config = {}) => {
  const response = await client.put(url, data, config)
  return response
}

export const withAuth = (token: any, config = {}) => {
  return {
    ...config,
    headers: {
      // @ts-expect-error TS(2339): Property 'headers' does not exist on type '{}'.
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }
}

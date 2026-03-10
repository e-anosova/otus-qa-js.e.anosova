import axios from 'axios'
import { httpGet, httpPost, httpPut, httpDelete, withAuth } from './baseService'

interface TokenResponse {
  token: string
  expires?: string
  status?: string
  result?: string
}

export const createUser = async (userData: any) => {
  const response = await httpPost('/Account/v1/User', userData)
  return response
}

export const generateToken = async (userData: any) => {
  const response = (await httpPost('/Account/v1/GenerateToken', userData)) as { data: TokenResponse }
  return response.data.token
}

export const authorizeUser = async (userData: any) => {
  const response = await httpPost(`/Account/v1/Authorized`, userData)
  return response
}

export const getUser = async (userId: any, token: any) => {
  const response = await httpGet(`/Account/v1/User/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response
}

export const deleteUser = async (userId: any, authToken: any) => {
  const response = await httpDelete(`/Account/v1/User/${userId}`, {
    headers: { Authorization: `Bearer ${authToken}` }
  })
  return response
}

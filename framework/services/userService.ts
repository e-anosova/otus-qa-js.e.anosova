import axios from 'axios'
import { httpGet, httpPost, httpPut, httpDelete, withAuth } from './baseService'

export const createUser = async userData => {
  const response = await httpPost('/Account/v1/User', userData)
  return response
}

export const generateToken = async userData => {
  const response = await httpPost('/Account/v1/GenerateToken', userData)
  return response.data.token
}

export const authorizeUser = async userData => {
  const response = await httpPost(`/Account/v1/Authorized`, userData)
  return response
}

export const getUser = async (userId, token) => {
  const response = await httpGet(`/Account/v1/User/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response
}

export const deleteUser = async (userId, authToken) => {
  const response = await httpDelete(`/Account/v1/User/${userId}`, {
    headers: { Authorization: `Bearer ${authToken}` }
  })
  return response
}

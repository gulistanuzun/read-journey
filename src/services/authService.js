import api from './api'

export const registerUser = async (userData) => {
  const response = await api.post('/users/signup', userData)
  return response.data
}
export const loginUser = async (userData) => {
  const response = await api.post('/users/signin', userData)
  return response.data
}

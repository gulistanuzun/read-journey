import api from './api'

export const getRecommendedBooks = async (page, perPage) => {
  const response = await api.get('/books/recommend', {
    params: { page, perPage },
  })
  return response.data
}
export const getBookById = async (id) => {
  const response = await api.get(`/books/${id}`)
  return response.data
}

export const addBookFromRecommended = async (id) => {
  const response = await api.post(`/books/add/${id}`)
  return response.data
}

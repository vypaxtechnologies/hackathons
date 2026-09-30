import apiClient from './apiClient'

/** Judge management and scoring endpoints. */
export const judgeService = {
  async list() {
    const { data } = await apiClient.get('/judges')
    return data
  },

  async listAll() {
    const { data } = await apiClient.get('/judges/all')
    return data
  },

  async getById(id) {
    const { data } = await apiClient.get(`/judges/${id}`)
    return data
  },

  async create(payload) {
    const { data } = await apiClient.post('/judges', payload)
    return data
  },

  async update(id, payload) {
    const { data } = await apiClient.put(`/judges/${id}`, payload)
    return data
  },

  async remove(id) {
    const { data } = await apiClient.delete(`/judges/${id}`)
    return data
  }
}

/** Evaluation (scoring) endpoints. */
export const evaluationService = {
  async list(params = {}) {
    const { data } = await apiClient.get('/evaluations', { params })
    return data
  },

  async getById(id) {
    const { data } = await apiClient.get(`/evaluations/${id}`)
    return data
  },

  async create(payload) {
    const { data } = await apiClient.post('/evaluations', payload)
    return data
  },

  async update(id, payload) {
    const { data } = await apiClient.put(`/evaluations/${id}`, payload)
    return data
  },

  async remove(id) {
    const { data } = await apiClient.delete(`/evaluations/${id}`)
    return data
  }
}

export default judgeService

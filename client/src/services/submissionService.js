import apiClient from './apiClient'

/** Project submission endpoints. */
const submissionService = {
  async list(params = {}) {
    const { data } = await apiClient.get('/submissions', { params })
    return data
  },

  async getById(id) {
    const { data } = await apiClient.get(`/submissions/${id}`)
    return data
  },

  async create(payload) {
    const { data } = await apiClient.post('/submissions', payload)
    return data
  },

  async update(id, payload) {
    const { data } = await apiClient.put(`/submissions/${id}`, payload)
    return data
  },

  async remove(id) {
    const { data } = await apiClient.delete(`/submissions/${id}`)
    return data
  }
}

export default submissionService

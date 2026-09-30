import apiClient from './apiClient'

/** Team registration and membership endpoints. */
const teamService = {
  async list(params = {}) {
    const { data } = await apiClient.get('/teams', { params })
    return data
  },

  async getMine() {
    const { data } = await apiClient.get('/teams/my')
    return data
  },

  async getById(id) {
    const { data } = await apiClient.get(`/teams/${id}`)
    return data
  },

  async create(payload) {
    const { data } = await apiClient.post('/teams', payload)
    return data
  },

  async update(id, payload) {
    const { data } = await apiClient.put(`/teams/${id}`, payload)
    return data
  },

  async remove(id) {
    const { data } = await apiClient.delete(`/teams/${id}`)
    return data
  }
}

export default teamService

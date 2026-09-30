import apiClient from './apiClient'

/**
 * Public and admin hackathon endpoints. Admin mutations accept the full
 * hackathon payload so the admin panel can manage an edition end to end.
 */
const hackathonService = {
  async list(params = {}) {
    const { data } = await apiClient.get('/hackathons', { params })
    return data
  },

  async getBySlug(slug) {
    const { data } = await apiClient.get(`/hackathons/slug/${slug}`)
    return data
  },

  async getById(id) {
    const { data } = await apiClient.get(`/hackathons/${id}`)
    return data
  },

  async create(payload) {
    const { data } = await apiClient.post('/hackathons', payload)
    return data
  },

  async update(id, payload) {
    const { data } = await apiClient.put(`/hackathons/${id}`, payload)
    return data
  },

  async remove(id) {
    const { data } = await apiClient.delete(`/hackathons/${id}`)
    return data
  },

  async togglePublish(id) {
    const { data } = await apiClient.patch(`/hackathons/${id}/toggle-publish`)
    return data
  }
}

export default hackathonService

import apiClient from './apiClient'

/**
 * Public contact form submission. Messages are persisted by the API and
 * surfaced to admins through `adminService.getContactMessages`.
 */
const contactService = {
  async send({ name, email, phone, subject, message }) {
    const { data } = await apiClient.post('/api/contact', {
      name,
      email,
      phone,
      subject,
      message
    })
    return data
  }
}

export default contactService

import apiClient from './apiClient'

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

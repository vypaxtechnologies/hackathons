import axios from 'axios'
import { API_BASE_URL } from '../config/site'

export const AUTH_TOKEN_KEY = 'vypax.auth.token'

export const tokenStore = {
  get() {
    try {
      return window.localStorage.getItem(AUTH_TOKEN_KEY)
    } catch {
      return null
    }
  },
  set(token) {
    try {
      window.localStorage.setItem(AUTH_TOKEN_KEY, token)
    } catch {
      /* storage unavailable — cookie auth still applies */
    }
  },
  clear() {
    try {
      window.localStorage.removeItem(AUTH_TOKEN_KEY)
    } catch {
      /* no-op */
    }
  }
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' }
})

apiClient.interceptors.request.use((config) => {
  const token = tokenStore.get()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/**
 * Normalises every failure into a single `{ message, status, isNetworkError }`
 * shape so components never have to guess at the error envelope.
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isNetworkError = !error.response
    const status = error.response?.status ?? 0
    const payload = error.response?.data

    let message = payload?.error || payload?.message

    if (!message && isNetworkError) {
      message = 'Unable to reach the Vypax API. Check that the server is running and try again.'
    }
    if (!message && status === 401) message = 'Your session has expired. Please sign in again.'
    if (!message && status === 403) message = 'You do not have permission to perform this action.'
    if (!message && status === 404) message = 'The requested resource was not found.'
    if (!message && status >= 500) message = 'The server ran into a problem. Please try again.'
    if (!message) message = error.message || 'Something went wrong.'

    if (status === 401) {
      tokenStore.clear()
    }

    return Promise.reject({ message, status, isNetworkError, raw: error })
  }
)

export { apiClient }
export default apiClient

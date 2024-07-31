import axios from 'axios'
import store from '@/store/index'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && !error.config._retry) {
      error.config._retry = true
      const refreshed = await store.dispatch('refreshToken')
      if (refreshed) {
        error.config.headers[
          'Authorization'
        ] = `Bearer ${store.state.accessToken}`
        return api(error.config)
      }
    }
    return Promise.reject(error)
  }
)

export default api

import axios from 'axios'
import store from '@/store/index'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = store.state.accessToken

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('API Error:', error)

    // Safely access error properties
    const errorResponse = error.response
    const errorRequest = error.request
    const errorMessage = error.message

    if (errorResponse) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error data:', errorResponse.data)
      console.error('Error status:', errorResponse.status)
      console.error('Error headers:', errorResponse.headers)

      if (errorResponse.status === 401 && !error.config._retry) {
        error.config._retry = true
        try {
          const refreshed = await store.dispatch('refreshToken')
          if (refreshed) {
            error.config.headers[
              'Authorization'
            ] = `Bearer ${store.state.accessToken}`
            return api(error.config)
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError)
          // Handle failed refresh (e.g., logout user)
          // store.dispatch('logout');
          return Promise.reject(refreshError)
        }
      }
    } else if (errorRequest) {
      // The request was made but no response was received
      console.error('Error request:', errorRequest)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', errorMessage)
    }

    return Promise.reject(error)
  }
)

export default api

import Vuex from 'vuex'
import Cookies from 'js-cookie'
import api from '@/services/api'

export default new Vuex.Store({
  state: {
    accessToken: null,
    refreshToken: null,
    user: null,
  },
  mutations: {
    setTokens(state, { access, refresh }) {
      state.accessToken = access
      state.refreshToken = refresh
    },
    setUser(state, user) {
      state.user = user
    },
    clearAuth(state) {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await api.post('/api/token/', credentials)
        const { access, refresh } = response.data
        commit('setTokens', { access, refresh })
        Cookies.set('accessToken', access)
        Cookies.set('refreshToken', refresh)
        await this.dispatch('fetchUser')
        return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
    },
    async fetchUser({ commit, state }) {
      try {
        const response = await api.get('/api/user/', {
          headers: { Authorization: `Bearer ${state.accessToken}` },
        })
        commit('setUser', response.data)
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    },
    logout({ commit }) {
      commit('clearAuth')
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
    },
    async refreshToken({ commit, state }) {
      try {
        const response = await api.post('/api/token/refresh/', {
          refresh: state.refreshToken,
        })
        const { access } = response.data
        commit('setTokens', { access, refresh: state.refreshToken })
        Cookies.set('accessToken', access)
        return true
      } catch (error) {
        console.error('Token refresh failed:', error)
        return false
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
})

import Vuex from 'vuex'
import Cookies from 'js-cookie'
import api from '@/services/api'

export default new Vuex.Store({
  state: {
    accessToken: null,
    refreshToken: null,
    user: null,
    userId: null,
  },
  mutations: {
    setTokens(state, { access, refresh }) {
      state.accessToken = access
      state.refreshToken = refresh
    },
    setUser(state, user) {
      state.user = user
    },
    setUserId(state, userId) {
      state.userId = userId
    },
    clearAuth(state) {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
      state.userId = null
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await api.post('/api/token/', credentials)
        const { access, refresh, user_id } = response.data
        commit('setTokens', { access, refresh })
        commit('setUserId', user_id)
        Cookies.set('accessToken', access)
        Cookies.set('refreshToken', refresh)
        Cookies.set('userId', user_id)

        await this.dispatch('fetchUser', user_id)
        return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
    },
    async fetchUser({ commit, state }, userId) {
      try {
        const response = await api.get(`/api/user/${userId}`, {
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
      Cookies.remove('userId')
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

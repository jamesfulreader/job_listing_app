import Vuex from 'vuex'
import Cookies from 'js-cookie'
import api from '@/services/api'
import axios from 'axios'

export default new Vuex.Store({
  state: {
    accessToken: null,
    refreshToken: null,
    user: null,
    userId: null,
    isAuthenticated: false,
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
    setAuthentication(state, status) {
      state.isAuthenticated = status
    },
    clearAuth(state) {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
      state.userId = null
      state.isAuthenticated = false
    },
  },
  actions: {
    async register({ commit }, credentials) {
      try {
        const response = await api.post('/user/register/', credentials)
        const { access, refresh, user_id } = response.data
        commit('setTokens', { access, refresh })
        commit('setUserId', user_id)
        commit('setAuthentication', true)
        Cookies.set('accessToken', access)
        Cookies.set('refreshToken', refresh)
        Cookies.set('userId', user_id)
        await this.dispatch('fetchUser', user_id)
        return true
      } catch (error) {
        console.error('Registration failed: ', error)
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await api.post('/token/', credentials)
        const { access, refresh, user_id } = response.data
        commit('setTokens', { access, refresh })
        commit('setUserId', user_id)
        commit('setAuthentication', true)
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
        const response = await api.get(`/user/${userId}`)
        commit('setUser', response.data)
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    },
    async logout({ commit }) {
      try {
        delete axios.defaults.headers.common['Authorization']
        commit('clearAuth')
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('userId')
      } catch (error) {
        console.error('logout failed: ', error)
      }
    },
    async refreshToken({ commit, state }) {
      try {
        const response = await api.post('/token/refresh/', {
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
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
  },
})

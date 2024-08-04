<script setup>
import logo from '@/assets/img/logo.png'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const isActiveLink = (routePath) => {
  const route = useRoute()
  return route.path === routePath
}

const isAuthenticated = computed(() => store.state.isAuthenticated)

const handleLogout = async () => {
  try {
    await store.dispatch('logout')
    router.push('/login')
  } catch (error) {
    console.error('Logout failed', error)
  }
}
</script>

<template>
  <nav class="bg-green-700 border-b border-green-500">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
            <span class="hidden md:block text-white text-2xl font-bold ml-2"
              >Job Listing</span
            >
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Home</RouterLink
              >
              <RouterLink
                to="/jobs"
                :class="[
                  isActiveLink('/jobs')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Jobs</RouterLink
              >
              <RouterLink
                v-if="isAuthenticated"
                to="/jobs/add"
                :class="[
                  isActiveLink('/jobs/add')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Add Job</RouterLink
              >
              <RouterLink
                v-if="!isAuthenticated"
                to="/register"
                :class="[
                  isActiveLink('/register')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
              >
                Register
              </RouterLink>
              <RouterLink
                v-if="!isAuthenticated"
                to="/login"
                :class="[
                  isActiveLink('/login')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
              >
                Login
              </RouterLink>
              <button
                v-if="isAuthenticated"
                @click="handleLogout"
                class="text-white px-3 py-2 rounded-md hover:bg-gray-900 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const username = ref('')
const password = ref('')

const handleLogin = async () => {
  const success = await store.dispatch('login', {
    username: username.value,
    password: password.value,
  })
  if (success) {
    console.log('Login success')
    router.push({ name: 'home' })
  } else {
    console.error('login failed')
  }
}
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center bg-slate-100">
    <form
      @submit.prevent="handleLogin"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        v-model="username"
        type="text"
        placeholder="Username"
      />
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import api from '@/services/api'
import router from '@/router'

const props = defineProps({
  jobId: String,
})

const handleDelete = async () => {
  try {
    console.log()
    const res = await api.delete(`/jobs/${props.jobId}/`)
    router.push('/jobs')
  } catch (error) {
    console.error('error occured during delete: ', error)
  }
}
</script>
<template>
  <div class="bg-white p-6 rounded-lg shadow-md mt-6">
    <h3 class="text-xl font-bold mb-6">Manage Job</h3>
    <RouterLink
      :to="`/jobs/edit/${jobId}`"
      class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
      >Edit Job</RouterLink
    >
    <button
      @click.prevent="handleDelete"
      class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
    >
      Delete Job
    </button>
  </div>
</template>

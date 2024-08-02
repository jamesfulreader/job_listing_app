<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  jobId: String,
})
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
      class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
    >
      Delete Job
    </button>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, defineProps, onMounted } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import JobListing from './JobListing.vue'

const jobs = ref([])
const isLoading = ref(true)

const getJobs = async () => {
  const res = await axios.get('/api/jobs/')
  const data = await res.data
  jobs.value = data
}

onMounted(() => {
  try {
    getJobs()
  } catch (error) {
    console.error('Error ', error.message)
  } finally {
    isLoading.value = false
  }
})

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Jobs
      </h2>
      <!-- Show spinner while isLoading -->
      <div v-if="isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>
    </div>
    <!-- Show job listing when done loading -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <JobListing
        v-for="job in jobs.slice(0, limit || jobs.length)"
        :key="job.id"
        :job="job"
      />
    </div>
  </section>
  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <a
      href="/jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Jobs</a
    >
  </section>
</template>

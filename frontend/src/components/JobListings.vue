<script setup>
import axios from 'axios'
import { ref } from 'vue'
let jobs = ref([])

const getJobs = async () => {
  const res = await axios.get('http://127.0.0.1:8000/api/jobs/')
  const data = await res.data
  jobs.value = data
}

getJobs()
</script>

<template>
  <div v-for="job in jobs" :key="job.id">
    {{ job.title }}
    <br />
    {{ job.description }}
    <br />
    {{ job.location }}
    <br />
  </div>
</template>

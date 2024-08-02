<script setup>
import router from '@/router'
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const jobId = route.params.id

const form = reactive({
  position_type: '',
  title: '',
  description: '',
  salary_min: '',
  salary_max: '',
  location: '',
  company: {},
})

const state = reactive({
  job: {},
  isLoading: true,
})

const handleSubmit = async () => {
  const updatedJob = {
    title: form.title,
    type: form.position_typetype,
    location: form.location,
    description: form.description,
    salary_min: form.salary_min,
    salary_max: form.salary_max,
  }
  try {
    const res = await api.patch(`/jobs/${jobId}/`, updatedJob)
    router.push(`/jobs/${res.data.id}`)
  } catch (error) {
    console.error('error updating job: ', error)
  }
}

onMounted(async () => {
  try {
    const res = await api.get(`/jobs/${jobId}/`)
    state.job = res.data
    form.position_type = state.job.position_type
    form.title = state.job.title
    form.description = state.job.description
    form.salary_min = state.job.salary_min
    form.salary_max = state.job.salary_max
    form.location = state.job.location
    form.company = state.job.company
  } catch (error) {
    console.error('Error fetching job', error)
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Update Job</h2>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
              >Job Type</label
            >
            <select
              v-model="form.position_type"
              id="type"
              name="type"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Job Listing Name</label
            >
            <input
              type="text"
              v-model="form.title"
              id="name"
              name="name"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. Beautiful Apartment In Miami"
              required
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2"
              >Description</label
            >
            <textarea
              id="description"
              v-model="form.description"
              name="description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Add any job duties, expectations, requirements, etc"
            ></textarea>
          </div>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
              >Salary Min</label
            >
            <input
              type="number"
              name="salary_min"
              id="salary_min"
              class="border rounded w-full py-2 px-3"
              min="0.00"
              step="0.01"
              v-model="form.salary_min"
            />
          </div>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
              >Salary Max</label
            >
            <input
              type="number"
              name="salary_max"
              id="salary_max"
              class="border rounded w-full py-2 px-3"
              min="0.00"
              step="0.01"
              v-model="form.salary_max"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"> Location </label>
            <input
              type="text"
              v-model="form.location"
              id="location"
              name="location"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Company Location"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="company"
              >Company</label
            >
            <h5>{{ form.company.name }}</h5>
            <p>{{ form.company.description }}</p>
            <p>{{ form.company.contat_email }}</p>
            <p>{{ form.company.contact_phone }}</p>
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

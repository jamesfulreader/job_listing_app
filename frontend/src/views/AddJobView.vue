<script setup>
import router from '@/router'
import { reactive, onMounted, ref } from 'vue'
// import { useToast } from 'vue-toastification'
import axios from 'axios'
import api from '@/services/api'

const companies = ref([])

const form = reactive({
  position_type: 'Full-Time',
  title: '',
  description: '',
  salary_min: '',
  salary_max: '',
  location: '',
  company: {},
})

onMounted(async () => {
  try {
    const res = await axios.get('/api/companies/')
    companies.value = res.data
  } catch (error) {}
})
// const toast = useToast()

const handleSubmit = async () => {
  const newJob = {
    title: form.title,
    position_type: form.position_type,
    location: form.location,
    description: form.description,
    salary_min: form.salary_min,
    salary_max: form.salary_max,
    company_id: form.company.id,
  }
  console.log(newJob)
  try {
    const response = await api.post('/jobs/', newJob)
    // toast.success('Job Added Successfully')
    router.push(`/jobs/${response.data.id}`)
  } catch (error) {
    console.error('Error fetching job', error)
    // toast.error('Job Was Not Added')
  }
}
</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Job</h2>

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
              <option value="Remote">Contract</option>
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
              >Select a company</label
            >
            <div class="space-y-2">
              <div
                v-for="company in companies"
                :key="company.name"
                class="flex items-center"
              >
                <input
                  v-model="form.company"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  type="radio"
                  :id="company.name"
                  :name="company.name"
                  :value="company"
                />
                <label
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  :for="company.name"
                >
                  {{ company.name }}
                </label>
              </div>
            </div>
          </div>
          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

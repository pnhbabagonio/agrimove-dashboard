<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
      <h2 class="mb-4 text-2xl font-bold text-center text-gray-700">Sign Up as Farmer</h2>
      <form @submit.prevent="handleSignup">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="John Doe"
            v-model="name"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="farmer@example.com"
            v-model="email"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter password"
            v-model="password"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-600">Confirm Password</label>
          <input
            type="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Confirm password"
            v-model="confirmPassword"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-600">Farm Name (optional)</label>
          <input
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Green Acres"
            v-model="farmName"
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          Create Account
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">Already have an account?</p>
        <NuxtLink to="/login" class="text-green-600 hover:underline">
          Login here
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const farmName = ref('')
const router = useRouter()

const handleSignup = () => {
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    alert('Please fill out all required fields')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }

  // Simulate registration (replace with real API call)
  console.log('Registering Farmer:', {
    name: name.value,
    email: email.value,
    password: password.value,
    farmName: farmName.value,
  })

  // Redirect to farmer dashboard or login
  router.replace('/farmer/dashboard')
}
</script>

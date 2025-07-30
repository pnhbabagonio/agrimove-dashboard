<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <h2 class="mb-6 text-2xl font-bold text-center text-green-700">
        Login
      </h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            class="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your email"
            v-model="email"
          />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            class="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your password"
            v-model="password"
          />
        </div>

        <button
          type="submit"
          class="w-full py-2.5 px-4 text-sm font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          Login
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-600">
        <p class="mb-2">Don't have an account?</p>
        <div class="flex flex-col gap-2">
          <NuxtLink to="/signup/farmer" class="text-green-600 hover:underline hover:text-green-700">
            Sign up as Farmer
          </NuxtLink>
          <NuxtLink to="/signup/driver" class="text-green-600 hover:underline hover:text-green-700">
            Sign up as Driver
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const user = ref(null)
const router = useRouter()

const handleLogin = () => {
  if (email.value === 'farmer@example.com') {
    user.value = { role: 'farmer' }
  } else if (email.value === 'driver@example.com') {
    user.value = { role: 'driver' }
  } else if (email.value === 'admin@example.com') {
    user.value = { role: 'admin' }
  } else {
    user.value = null
  }

  if (!user.value) {
    alert('Invalid login or user not found')
    return
  }

  switch (user.value.role) {
    case 'admin':
      router.replace('/admin/dashboard')
      break
    case 'farmer':
      router.replace('/farmer/dashboard')
      break
    case 'driver':
      router.replace('/driver/dashboard')
      break
    default:
      router.replace('/unauthorized')
  }
}
</script>

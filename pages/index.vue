<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
      <h2 class="mb-4 text-2xl font-bold text-center text-gray-700">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
            v-model="email"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
            v-model="password"
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="mb-2 text-sm text-gray-600">Don't have an account?</p>
        <div class="flex flex-col gap-2">
          <NuxtLink
            to="/signup/farmer"
            class="text-blue-600 hover:underline"
          >
            Sign up as Farmer
          </NuxtLink>
          <NuxtLink
            to="/signup/driver"
            class="text-blue-600 hover:underline"
          >
            Sign up as Driver
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = () => {
  // Dummy login - skip validation
  router.push('/admin/dashboard')
}
</script>

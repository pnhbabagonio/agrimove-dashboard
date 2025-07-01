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
          <NuxtLink to="/signup/farmer" class="text-blue-600 hover:underline">
            Sign up as Farmer
          </NuxtLink>
          <NuxtLink to="/signup/driver" class="text-blue-600 hover:underline">
            Sign up as Driver
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

// Dummy ref values (you can replace these with real login logic)
const email = ref('')
const password = ref('')
const router = useRouter()

// Dummy user (replace this with real login API result)
const user = ref(null)

const handleLogin = () => {
  // Dummy logic: simulate login based on email
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

  const role = user.value.role

  switch (role) {
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

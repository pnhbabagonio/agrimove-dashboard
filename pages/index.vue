<template>
  <div class="min-h-screen flex items-center justify-center bg-[var(--color-bg-muted)] px-4">
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg border border-[var(--color-border)]">
      <!-- Title -->
      <h2 class="mb-6 text-2xl font-bold text-center text-[var(--color-primary-dark)]">Login</h2>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email -->
        <div>
          <label class="block mb-1 text-sm font-medium text-[var(--color-text)]">Email</label>
          <input
            type="email"
            v-model="email"
            class="block w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            :class="{ 'border-red-500': emailError }"
            placeholder="Enter your email"
          />
          <p v-if="emailError" class="text-sm text-red-600 mt-1">{{ emailError }}</p>
        </div>

        <!-- Password -->
        <div>
          <label class="block mb-1 text-sm font-medium text-[var(--color-text)]">Password</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="block w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              :class="{ 'border-red-500': passwordError }"
              placeholder="Enter your password"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              @click="showPassword = !showPassword"
            >
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.967 9.967 0 012.291-6.348m14.356.294A9.964 9.964 0 0122 9c0 5.523-4.477 10-10 10a9.964 9.964 0 01-6.651-2.648M9.879 9.879A3 3 0 1114.12 14.12M15 12a3 3 0 00-3-3" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3l18 18M10.477 10.477a3 3 0 004.243 4.243m3.325-3.325A9.953 9.953 0 0021 12a9.953 9.953 0 00-1.478-4.936M6.18 6.18A9.953 9.953 0 003 12c0 2.21.715 4.245 1.918 5.918" />
              </svg>
            </button>
          </div>
          <p v-if="passwordError" class="text-sm text-red-600 mt-1">{{ passwordError }}</p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2.5 px-4 text-sm font-bold rounded-lg transition text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-60"
        >
          <span v-if="loading">Logging in...</span>
          <span v-else>Login</span>
        </button>
      </form>

      <!-- Sign-up links -->
      <div class="mt-6 text-center text-sm text-[var(--color-text-muted)]">
        <p class="mb-2">Don't have an account?</p>
        <div class="flex flex-col gap-2">
          <NuxtLink to="/signup/farmer" class="text-[var(--color-primary-dark)] hover:underline">
            Sign up as Farmer
          </NuxtLink>
          <NuxtLink to="/signup/driver" class="text-[var(--color-primary-dark)] hover:underline">
            Sign up as Driver
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ //This layout renders just the page, without the sidebar, topbar, or padding.
  layout: 'empty'
})
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)

const emailError = ref('')
const passwordError = ref('')

const router = useRouter()

const handleLogin = async () => {
  emailError.value = ''
  passwordError.value = ''

  if (!email.value) {
    emailError.value = 'Email is required'
  }

  if (!password.value) {
    passwordError.value = 'Password is required'
  }

  if (emailError.value || passwordError.value) return

  loading.value = true

  setTimeout(() => {
    let role = null
    if (email.value === 'admin@example.com') role = 'admin'
    else if (email.value === 'farmer@example.com') role = 'farmer'
    else if (email.value === 'driver@example.com') role = 'driver'

    if (!role) {
      alert('Invalid credentials')
      loading.value = false
      return
    }

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
    }

    loading.value = false
  }, 1000)
}
</script>

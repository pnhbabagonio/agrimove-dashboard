<template>
  <div class="min-h-screen flex items-center justify-center bg-[var(--color-bg-muted)] px-4">
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg border border-[var(--color-border)]">
      <!-- Title -->
      <h2 class="mb-6 text-2xl font-bold text-center text-[var(--color-primary-dark)]">Login</h2>

      <!-- Development Notice -->
      <!-- <div class="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p class="text-xs text-yellow-800">
          <strong>Development Mode:</strong> Using dummy data while API is unavailable
        </p>
      </div> -->

      <!-- Dummy Accounts Info -->
      <!-- <div class="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p class="text-xs text-blue-800 font-semibold mb-2">Test Accounts:</p>
        <div class="text-xs text-blue-700 space-y-1">
          <div><strong>Admin:</strong> 09123456789 / admin123</div>
          <div><strong>Farmer:</strong> 09987654321 / farmer123</div>
          <div><strong>Driver:</strong> 09111222333 / driver123</div>
        </div>
      </div> -->

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Mobile Number -->
        <div>
          <label class="block mb-1 text-sm font-medium text-[var(--color-text)]">Mobile Number</label>
          <input
            type="tel"
            v-model="mobileNo"
            class="block w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            :class="{ 'border-red-500': mobileNoError }"
            placeholder="Enter your mobile number"
          />
          <p v-if="mobileNoError" class="text-sm text-red-600 mt-1">{{ mobileNoError }}</p>
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
                  d="M13.875 18.825A10.05 10.05 0112 19c-5.523 0-10-4.477-10-10a9.967 9.967 0 012.291-6.348m14.356.294A9.964 9.964 0 0122 9c0 5.523-4.477 10-10 10a9.964 9.964 0 01-6.651-2.648M9.879 9.879A3 3 0 1114.12 14.12M15 12a3 3 0 00-3-3" />
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
definePageMeta({ layout: 'empty' })

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const mobileNo = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)

const mobileNoError = ref('')
const passwordError = ref('')

// Dummy user accounts for testing
const dummyUsers = [
  {
    mobile_no: '09123456789',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  },
  {
    mobile_no: '09987654321',
    password: 'farmer123',
    role: 'farmer',
    name: 'John Farmer'
  },
  {
    mobile_no: '09111222333',
    password: 'driver123',
    role: 'driver',
    name: 'Mike Driver'
  }
]

// Generate dummy JWT token
const generateDummyToken = (user) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({
    user_id: Math.floor(Math.random() * 1000),
    mobile_no: user.mobile_no,
    role: user.role,
    name: user.name,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 hours
    iat: Math.floor(Date.now() / 1000)
  }))
  const signature = btoa('dummy-signature')
  
  return `${header}.${payload}.${signature}`
}

const handleLogin = async () => {
  mobileNoError.value = ''
  passwordError.value = ''

  if (!mobileNo.value) {
    mobileNoError.value = 'Mobile number is required'
  }

  if (!password.value) {
    passwordError.value = 'Password is required'
  }

  if (mobileNoError.value || passwordError.value) return

  loading.value = true

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Find matching user in dummy data
    const user = dummyUsers.find(u => 
      u.mobile_no === mobileNo.value && u.password === password.value
    )

    if (!user) {
      passwordError.value = 'Invalid mobile number or password'
      return
    }

    // Generate dummy tokens
    const accessToken = generateDummyToken(user)
    const refreshToken = generateDummyToken({ ...user, type: 'refresh' })

    // Store tokens (same as original logic)
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken)

    // Route based on role
    switch (user.role) {
      case 'admin':
        router.replace('/admin/dashboard')
        break
      case 'driver':
        router.replace('/driver/dashboard')
        break
      default:
        router.replace('/farmer/dashboard')
    }

  } catch (error) {
    console.error('Login error:', error)
    passwordError.value = 'Something went wrong. Please try again later.'
  } finally {
    loading.value = false
  }
}
</script>
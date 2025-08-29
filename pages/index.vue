<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Animated Farm Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
      <!-- Animated clouds -->
      <div class="absolute top-10 left-10 w-24 h-12 bg-white/30 rounded-full animate-float-slow"></div>
      <div class="absolute top-20 right-20 w-32 h-16 bg-white/20 rounded-full animate-float-slower"></div>
      <div class="absolute top-32 left-1/3 w-20 h-10 bg-white/25 rounded-full animate-float-fast"></div>
      
      <!-- Farm elements -->
      <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-emerald-200/30 to-transparent"></div>
      
      <!-- Animated crop rows -->
      <div class="absolute bottom-20 left-0 w-full h-4 bg-gradient-to-r from-green-300/20 via-emerald-300/30 to-green-300/20 transform -skew-y-1"></div>
      <div class="absolute bottom-16 left-0 w-full h-4 bg-gradient-to-r from-lime-300/15 via-green-300/25 to-lime-300/15 transform -skew-y-1"></div>
      <div class="absolute bottom-12 left-0 w-full h-4 bg-gradient-to-r from-emerald-300/20 via-lime-300/30 to-emerald-300/20 transform -skew-y-1"></div>
      
      <!-- Floating elements -->
      <div class="absolute top-1/4 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-bounce" style="animation-delay: 0.5s"></div>
      <div class="absolute top-1/3 left-1/4 w-1 h-1 bg-lime-400 rounded-full animate-bounce" style="animation-delay: 1s"></div>
      <div class="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style="animation-delay: 1.5s"></div>
      
      <!-- Sun -->
      <div class="absolute top-16 right-16 w-16 h-16 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-full opacity-80 animate-pulse"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-md">
        <!-- Logo/Title Section -->
        <!-- <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
            <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 6V4L9 5V7H3V9H21M20 10H4V12H6V19H8V12H10V19H12V12H14V19H16V12H18V19H20V12H22V10H20Z"/>
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">AgriConnect</h1>
          <p class="text-gray-600">Welcome back to your farm management system</p>
        </div> -->

        <!-- Login Card -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 p-8 transform hover:scale-[1.01] transition-all duration-300">
          <!-- Form Header -->
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Sign In</h2>
            <p class="text-gray-500 mt-1">Enter your credentials to continue</p>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Mobile Number -->
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Mobile Number</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <input
                  type="tel"
                  v-model="mobileNo"
                  class="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
                  :class="{ 'border-red-300 focus:ring-red-500': mobileNoError }"
                  placeholder="09XXXXXXXXX"
                />
              </div>
              <p v-if="mobileNoError" class="text-sm text-red-500 flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                {{ mobileNoError }}
              </p>
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  class="block w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
                  :class="{ 'border-red-300 focus:ring-red-500': passwordError }"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  @click="showPassword = !showPassword"
                >
                  <svg v-if="showPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.967 9.967 0 012.291-6.348m14.356.294A9.964 9.964 0 0122 9c0 5.523-4.477 10-10 10a9.964 9.964 0 01-6.651-2.648M9.879 9.879A3 3 0 1114.12 14.12M15 12a3 3 0 00-3-3"/>
                  </svg>
                  <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
              <p v-if="passwordError" class="text-sm text-red-500 flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                {{ passwordError }}
              </p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span v-if="loading" class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Signing you in...
              </span>
              <span v-else>Sign In</span>
            </button>
          </form>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-gray-500">New to AgriMove?</span>
            </div>
          </div>

          <!-- Sign-up Options -->
          <div class="space-y-3">
            <NuxtLink 
              to="/signup/farmer" 
              class="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border-2 border-green-200 text-green-700 font-medium rounded-xl hover:bg-green-50 hover:border-green-300 transition-all duration-200 group"
            >
              <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 6V4L9 5V7H3V9H21M20 10H4V12H6V19H8V12H10V19H12V12H14V19H16V12H18V19H20V12H22V10H20Z"/>
              </svg>
              Join as Farmer
            </NuxtLink>
            <NuxtLink 
              to="/signup/driver" 
              class="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border-2 border-blue-200 text-blue-700 font-medium rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
            >
              <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5M19.5,9.5L21.46,12H17V9.5M6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5M20,8H17V4H3C1.89,4 1,4.89 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8Z"/>
              </svg>
              Join as Driver
            </NuxtLink>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-12 text-sm text-gray-600">
          <!-- <p>&copy; 2024 AgriConnect. Connecting farmers, drivers, and communities.</p> -->
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

<style scoped>
@keyframes float-slow {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  33% { transform: translateY(-20px) translateX(10px); }
  66% { transform: translateY(-10px) translateX(-5px); }
}

@keyframes float-slower {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-15px) translateX(15px); }
}

@keyframes float-fast {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  25% { transform: translateY(-10px) translateX(-8px); }
  50% { transform: translateY(-20px) translateX(5px); }
  75% { transform: translateY(-5px) translateX(10px); }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 12s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 6s ease-in-out infinite;
}
</style>
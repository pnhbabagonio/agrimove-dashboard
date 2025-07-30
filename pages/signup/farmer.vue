<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 class="mb-6 text-2xl font-bold text-center text-green-700">
        Farmer Sign Up
      </h2>

      <!-- Step 1: Enter Phone Number -->
      <form v-if="step === 1" @submit.prevent="sendOTP">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="+1234567890"
            v-model="phone"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          Send OTP
        </button>
      </form>

      <!-- Step 2: Verify OTP -->
      <form v-if="step === 2" @submit.prevent="verifyOTP">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-700">Enter OTP</label>
          <input
            type="text"
            maxlength="6"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter the 6-digit OTP"
            v-model="otp"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          Verify OTP
        </button>
      </form>

      <!-- Step 3: Full Registration -->
      <form v-if="step === 3" @submit.prevent="registerFarmer">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              v-model="firstName"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Middle Name</label>
            <input
              type="text"
              v-model="middleName"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              v-model="lastName"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              v-model="email"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>

        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium text-gray-700">Phone Number (Verified)</label>
          <input
            type="text"
            v-model="phone"
            readonly
            class="w-full px-4 py-2 bg-gray-100 border border-green-500 rounded-lg text-gray-500 cursor-not-allowed"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            v-model="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div class="mb-6">
          <label class="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            v-model="confirmPassword"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Step management
const step = ref(1)
const router = useRouter()

// OTP Flow
const phone = ref('')
const otp = ref('')

// User details
const firstName = ref('')
const middleName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// Simulated OTP (Replace with real API integration)
const generatedOTP = ref('')

// Step 1: Send OTP
const sendOTP = () => {
  if (!phone.value) {
    alert('Please enter a phone number.')
    return
  }

  generatedOTP.value = '123456' // Simulated OTP
  alert(`OTP sent to ${phone.value} (simulated: ${generatedOTP.value})`)
  step.value = 2
}

// Step 2: Verify OTP
const verifyOTP = () => {
  if (otp.value === generatedOTP.value) {
    alert('Phone number verified.')
    step.value = 3
  } else {
    alert('Invalid OTP.')
  }
}

// Step 3: Complete Registration
const registerFarmer = () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match.')
    return
  }

  // Replace with your API registration logic
  alert(`Welcome, ${firstName.value}! Your account has been created.`)
  router.replace('/farmer/dashboard')
}
</script>

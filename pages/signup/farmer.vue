<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 class="mb-6 text-2xl font-bold text-center text-green-700">Farmer Sign Up</h2>

      <!-- Step 1: Enter Phone Number -->
      <form v-if="step === 1" @submit.prevent="sendOTP">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            v-model="phone"
            placeholder="+639XXXXXXXXX"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          {{ loading ? 'Sending OTP...' : 'Send OTP' }}
        </button>
      </form>

      <!-- Step 2: Verify OTP -->
      <form v-if="step === 2" @submit.prevent="verifyOTP">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-700">Enter OTP</label>
          <input
            type="text"
            maxlength="6"
            v-model="otp"
            placeholder="Enter the 6-digit OTP"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          {{ loading ? 'Verifying...' : 'Verify OTP' }}
        </button>
      </form>

      <!-- Step 3: Full Registration -->
      <form v-if="step === 3" @submit.prevent="registerFarmer">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">First Name</label>
            <input v-model="firstName" type="text" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Middle Name</label>
            <input v-model="middleName" type="text" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Last Name</label>
            <input v-model="lastName" type="text" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
            <input v-model="email" type="email" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
        </div>

        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium text-gray-700">Verified Phone Number</label>
          <input type="text" :value="phone" readonly class="w-full px-4 py-2 bg-gray-100 border border-green-500 rounded-lg text-gray-500 cursor-not-allowed" />
        </div>

        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input v-model="password" type="password" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>

        <div class="mb-6">
          <label class="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
          <input v-model="confirmPassword" type="password" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'empty' })

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '~/composables/useApi'

const step = ref(1)
const loading = ref(false)
const router = useRouter()

// Inputs
const phone = ref('')
const otp = ref('')
const password = ref('')
const confirmPassword = ref('')
const firstName = ref('')
const middleName = ref('')
const lastName = ref('')
const email = ref('')
const uid = ref('')
const token = ref('')

// Send OTP Step
const sendOTP = async () => {
  if (!phone.value) return alert('Phone number is required.')
  loading.value = true

  try {
    await useApi('/users/resend-activation/', {
      method: 'POST',
      body: { mobile_no: phone.value },
    })
    alert('OTP sent successfully.')
    step.value = 2
  } catch (err) {
    alert(err?.data?.detail || 'Failed to send OTP.')
  } finally {
    loading.value = false
  }
}

// Verify OTP Step
const verifyOTP = async () => {
  loading.value = true
  try {
    const res = await useApi('/users/activation/', {
      method: 'POST',
      body: {
        uid: phone.value, // or UID from server if available
        token: otp.value,
      },
    })
    uid.value = res.uid
    token.value = res.token
    alert('OTP verified successfully.')
    step.value = 3
  } catch (err) {
    alert(err?.data?.detail || 'Invalid OTP.')
  } finally {
    loading.value = false
  }
}

// Register Farmer Step
const registerFarmer = async () => {
  if (password.value !== confirmPassword.value) {
    return alert('Passwords do not match.')
  }

  loading.value = true
  try {
    await useApi('/users/register/', {
      method: 'POST',
      body: {
        first_name: firstName.value,
        middle_name: middleName.value,
        last_name: lastName.value,
        email: email.value,
        mobile_no: phone.value,
        password: password.value,
        confirm_password: confirmPassword.value,
        role: 'farmer',
      },
    })
    alert('Account registered successfully!')
    router.replace('/farmer/dashboard')
  } catch (err) {
    alert(err?.data?.detail || 'Registration failed.')
  } finally {
    loading.value = false
  }
}
</script>

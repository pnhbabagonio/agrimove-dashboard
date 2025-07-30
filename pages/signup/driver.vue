<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 class="mb-6 text-2xl font-bold text-center text-blue-700">
        Driver Sign Up
      </h2>

      <!-- Step 1: Phone Number -->
      <form v-if="step === 1" @submit.prevent="sendOTP">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+1234567890"
            v-model="phone"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Send OTP
        </button>
      </form>

      <!-- Step 2: OTP Verification -->
      <form v-if="step === 2" @submit.prevent="verifyOTP">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-700">Enter OTP</label>
          <input
            type="text"
            maxlength="6"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the 6-digit OTP"
            v-model="otp"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Verify OTP
        </button>
      </form>

      <!-- Step 3: Registration -->
      <form v-if="step === 3" @submit.prevent="registerDriver">
        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            v-model="fullName"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            v-model="email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium text-gray-700">Phone Number (Verified)</label>
          <input
            type="text"
            v-model="phone"
            readonly
            class="w-full px-4 py-2 bg-gray-100 border border-blue-500 rounded-lg text-gray-500 cursor-not-allowed"
          />
        </div>

        <!-- Filterable Vehicle Type Dropdown -->
        <div class="mb-4 relative">
          <label class="block mb-1 text-sm font-medium text-gray-700">Vehicle Type</label>
          <input
            type="text"
            v-model="vehicleTypeInput"
            @input="filterVehicleTypes"
            placeholder="Type to search..."
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autocomplete="off"
          />
          <ul
            v-if="filteredVehicleTypes.length"
            class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto"
          >
            <li
              v-for="(type, index) in filteredVehicleTypes"
              :key="index"
              @click="selectVehicleType(type)"
              class="px-4 py-2 text-sm cursor-pointer hover:bg-blue-100"
            >
              {{ type }}
            </li>
          </ul>
        </div>

        <div class="mb-6">
          <label class="block mb-1 text-sm font-medium text-gray-700">Vehicle Brand</label>
          <input
            type="text"
            v-model="vehicleBrand"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
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

const router = useRouter()

// Step Control
const step = ref(1)

// OTP Fields
const phone = ref('')
const otp = ref('')
const generatedOTP = ref('')

// Registration Fields
const fullName = ref('')
const email = ref('')
const vehicleType = ref('')
const vehicleBrand = ref('')
const vehicleTypeInput = ref('')

// Vehicle Type List (can be dynamic)
const vehicleTypes = [
  'Motorcycle',
  'Tricycle',
  'Pickup Truck',
  'Van',
  'Mini Truck',
  'SUV',
  'Trailer',
  'Lorry',
]

const filteredVehicleTypes = ref([])

const sendOTP = () => {
  if (!phone.value) {
    alert('Enter a valid phone number.')
    return
  }
  generatedOTP.value = '123456' // Simulated
  alert(`OTP sent to ${phone.value} (simulated: ${generatedOTP.value})`)
  step.value = 2
}

const verifyOTP = () => {
  if (otp.value === generatedOTP.value) {
    alert('Phone verified.')
    step.value = 3
  } else {
    alert('Incorrect OTP.')
  }
}

const filterVehicleTypes = () => {
  const input = vehicleTypeInput.value.toLowerCase()
  filteredVehicleTypes.value = vehicleTypes.filter((type) =>
    type.toLowerCase().includes(input)
  )
}

const selectVehicleType = (type) => {
  vehicleTypeInput.value = type
  vehicleType.value = type
  filteredVehicleTypes.value = []
}

const registerDriver = () => {
  if (!vehicleTypeInput.value || !vehicleBrand.value) {
    alert('Fill all required fields.')
    return
  }

  // Simulate registration
  alert(`Driver ${fullName.value} registered!`)
  router.replace('/driver/dashboard')
}
</script>

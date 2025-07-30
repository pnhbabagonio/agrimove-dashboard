<template>
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
    <div
      class="w-full max-w-lg rounded-lg shadow-xl border backdrop-blur-md"
      style="background-color: rgba(255, 255, 255, 0.85); color: var(--color-text); border-color: var(--color-border);"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between px-6 py-4 rounded-t-md"
        style="background-color: var(--color-primary); color: white;"
      >
        <h2 class="text-xl font-semibold">Farmer Details</h2>
        <button @click="$emit('close')" aria-label="Close" class="hover:text-white/80 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="px-6 py-5 space-y-4">
        <div>
          <p class="text-sm font-medium text-[var(--color-text-muted)]">Full Name</p>
          <p class="text-base font-semibold">{{ farmer.name }}</p>
        </div>

        <div>
          <p class="text-sm font-medium text-[var(--color-text-muted)]">Farm Name</p>
          <p class="text-base font-semibold">{{ farmer.farm_name }}</p>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-[var(--color-text-muted)]">Email</p>
            <p class="text-base font-semibold">{{ farmer.email }}</p>
          </div>
          <button @click="copyEmail" class="text-sm text-[var(--color-primary-dark)] hover:underline">Copy</button>
        </div>

        <div>
          <p class="text-sm font-medium text-[var(--color-text-muted)]">Contact</p>
          <p class="text-base font-semibold">{{ farmer.contact }}</p>
        </div>

        <div>
          <p class="text-sm font-medium text-[var(--color-text-muted)]">Location</p>
          <p class="text-base font-semibold">{{ farmer.location }}</p>
        </div>

        <!-- Status Toggle -->
        <div class="flex items-center justify-between pt-4 border-t" style="border-color: var(--color-border);">
          <span class="text-sm font-medium">Account Status</span>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="isActive" class="sr-only" />
            <span
              class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-400
              peer-checked:bg-green-500 transition"
            ></span>
          </label>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t flex justify-end gap-3" style="border-color: var(--color-border);">
        <button
          class="px-4 py-2 text-sm font-medium rounded"
          style="background-color: var(--color-secondary-light); color: var(--color-secondary-dark);"
          @click="resetPassword"
        >
          Reset Password
        </button>
        <button
          class="px-4 py-2 text-sm font-medium rounded"
          style="background-color: var(--color-primary-light); color: var(--color-primary-dark);"
          @click="editFarmer"
        >
          Edit
        </button>
        <button
          class="px-4 py-2 text-sm font-medium rounded"
          style="background-color: var(--color-bg-muted); color: var(--color-text);"
          @click="$emit('close')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  farmer: Object,
})

const emit = defineEmits(['close'])

const isActive = ref(true)

watch(
  () => props.farmer,
  (newFarmer) => {
    isActive.value = !!newFarmer?.active
  },
  { immediate: true }
)

function copyEmail() {
  navigator.clipboard.writeText(props.farmer.email)
  alert('Email copied to clipboard!')
}

function editFarmer() {
  alert(`Editing farmer: ${props.farmer.name}`)
  // You can replace this with a modal or route push
}

function resetPassword() {
  alert(`Password reset link sent to: ${props.farmer.email}`)
}
</script>

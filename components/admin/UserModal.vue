<template>
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
    <div
      class="w-full max-w-lg rounded-lg shadow-xl border"
      style="background-color: var(--color-bg); color: var(--color-text); border-color: var(--color-border);"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between px-6 py-4"
        style="background-color: var(--color-primary); color: white;"
      >
        <h2 class="text-xl font-semibold">User Details</h2>
        <button @click="$emit('close')" aria-label="Close" class="hover:text-white/80 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="px-6 py-5 space-y-4">
        <div>
          <p class="text-sm font-medium" style="color: var(--color-text-muted);">Full Name</p>
          <p class="text-base font-semibold">{{ user.name }}</p>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium" style="color: var(--color-text-muted);">Email</p>
            <p class="text-base font-semibold">{{ user.email }}</p>
          </div>
          <button @click="copyEmail" class="text-sm text-[var(--color-primary)] hover:underline">Copy</button>
        </div>

        <div>
          <p class="text-sm font-medium" style="color: var(--color-text-muted);">Role</p>
          <span
            class="inline-block px-2 py-1 text-xs font-medium rounded-full"
            :style="roleBadgeStyle"
          >
            {{ user.role }}
          </span>
        </div>

        <div v-if="user.role === 'farmer'">
          <p class="text-sm font-medium" style="color: var(--color-text-muted);">Farm Name</p>
          <p class="text-base font-semibold">{{ user.farm_name || 'N/A' }}</p>
        </div>

        <div v-if="user.role === 'driver'">
          <p class="text-sm font-medium" style="color: var(--color-text-muted);">Vehicle Type</p>
          <p class="text-base font-semibold">{{ user.vehicle_type || 'N/A' }}</p>
        </div>

        <!-- Action Toggles -->
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
          @click="editUser"
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
import { computed, ref, watch } from 'vue'

const props = defineProps({
  user: Object,
})
const emit = defineEmits(['close'])

const isActive = ref(true)

watch(() => props.user, (newUser) => {
  isActive.value = !newUser.deactivated
}, { immediate: true })

function copyEmail() {
  navigator.clipboard.writeText(props.user.email)
  alert('Email copied to clipboard!')
}

function editUser() {
  alert(`Editing user: ${props.user.name}`)
  // Navigate to edit page or open edit modal
}

function resetPassword() {
  alert(`Password reset link sent to: ${props.user.email}`)
}

const roleBadgeStyle = computed(() => {
  switch (props.user.role) {
    case 'admin':
      return 'background-color: var(--color-primary-light); color: var(--color-primary-dark);'
    case 'farmer':
      return 'background-color: var(--color-secondary-light); color: var(--color-secondary-dark);'
    case 'driver':
      return 'background-color: #e0f2fe; color: #0284c7;'
    default:
      return 'background-color: #e5e7eb; color: #374151;'
  }
})
</script>

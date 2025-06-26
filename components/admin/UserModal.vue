<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white dark:bg-gray-900 p-6 rounded shadow-md w-full max-w-md">
      <h2 class="text-lg font-semibold mb-4">User Details</h2>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Role:</strong> {{ user.role }}</p>

      <div v-if="user.role === 'farmer'" class="mt-2">
        <p><strong>Farm:</strong> {{ user.farm_name }}</p>
      </div>
      <div v-if="user.role === 'driver'" class="mt-2">
        <p><strong>Vehicle:</strong> {{ user.vehicle_type }}</p>
      </div>

      <div class="mt-4 flex justify-end">
        <button class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded" @click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: Object
})
</script>

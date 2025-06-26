<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white dark:bg-gray-900 p-6 rounded shadow-md w-full max-w-md">
      <h2 class="text-lg font-semibold mb-4">Farmer Details</h2>
      <p><strong>Name:</strong> {{ farmer.name }}</p>
      <p><strong>Farm:</strong> {{ farmer.farm_name }}</p>
      <p><strong>Email:</strong> {{ farmer.email }}</p>
      <p><strong>Contact:</strong> {{ farmer.contact }}</p>
      <p><strong>Location:</strong> {{ farmer.location }}</p>

      <div class="mt-4 flex justify-end">
        <button @click="$emit('close')" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ farmer: Object })
</script>

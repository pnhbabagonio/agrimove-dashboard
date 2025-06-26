<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Drivers</h1>

    <!-- Capacity Filter -->
    <div>
      <label class="font-medium">Minimum Capacity (kg):</label>
      <input type="range" min="0" max="1000" step="50" v-model="minCapacity" />
      <span class="ml-2">{{ minCapacity }}kg+</span>
    </div>

    <!-- Driver Table -->
    <div class="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 dark:bg-gray-700 text-left">
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Vehicle</th>
            <th class="px-4 py-2">Capacity</th>
            <th class="px-4 py-2">Available</th>
            <th class="px-4 py-2">Tracking</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="driver in filteredDrivers"
            :key="driver.id"
            class="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td class="px-4 py-2">{{ driver.name }}</td>
            <td class="px-4 py-2">{{ driver.vehicle_type }}</td>
            <td class="px-4 py-2">{{ driver.capacity_kg }} kg</td>
            <td class="px-4 py-2">
              <input
                type="checkbox"
                v-model="driver.available"
                class="form-checkbox"
              />
            </td>
            <td class="px-4 py-2">
              <NuxtLink
                :to="`/admin/shipments?driver=${driver.id}`"
                class="text-blue-600 hover:underline"
              >
                View
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const minCapacity = ref(0)

const drivers = ref([
  { id: 1, name: 'Driver A', vehicle_type: 'Truck', capacity_kg: 800, available: true },
  { id: 2, name: 'Driver B', vehicle_type: 'Van', capacity_kg: 500, available: false },
  { id: 3, name: 'Driver C', vehicle_type: 'Bike', capacity_kg: 150, available: true },
])

const filteredDrivers = computed(() =>
  drivers.value.filter((d) => d.capacity_kg >= minCapacity.value)
)
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Farmers</h1>

    <!-- Filter/Search -->
    <div class="flex items-center gap-4">
      <input
        v-model="search"
        placeholder="Search by name or farm"
        class="border px-3 py-1 rounded w-64"
      />
    </div>

    <!-- Farmer Table -->
    <div class="overflow-x-auto bg-white dark:bg-gray-800 p-4 rounded shadow mt-4">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 dark:bg-gray-700 text-left">
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Farm</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="farmer in filteredFarmers"
            :key="farmer.id"
            class="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td class="px-4 py-2">{{ farmer.name }}</td>
            <td class="px-4 py-2">{{ farmer.farm_name }}</td>
            <td class="px-4 py-2">{{ farmer.email }}</td>
            <td class="px-4 py-2 space-x-2">
              <button class="text-blue-600 hover:underline" @click="selectedFarmer = farmer">View</button>
              <button class="text-yellow-600 hover:underline">Impersonate</button>
              <button class="text-red-600 hover:underline">Deactivate</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Farmer Modal -->
    <FarmerModal v-if="selectedFarmer" :farmer="selectedFarmer" @close="selectedFarmer = null" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FarmerModal from '@/components/admin/FarmerModal.vue'

const search = ref('')
const selectedFarmer = ref(null)

const farmers = ref([
  {
    id: 1,
    name: 'Farmer John',
    farm_name: 'Green Valley Farms',
    email: 'john@farm.com',
    contact: '0917-123-4567',
    location: 'Bulacan',
  },
  {
    id: 2,
    name: 'Farmer Jane',
    farm_name: 'AgriTech Co-op',
    email: 'jane@farm.com',
    contact: '0920-555-8899',
    location: 'Laguna',
  },
])

const filteredFarmers = computed(() =>
  farmers.value.filter(
    (f) =>
      f.name.toLowerCase().includes(search.value.toLowerCase()) ||
      f.farm_name.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>

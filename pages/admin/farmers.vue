<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold" style="color: var(--color-primary-dark)">Farmers</h1>
      <button
        @click="exportCSV"
        class="px-4 py-2 rounded text-sm font-medium"
        style="background-color: var(--color-primary); color: white"
      >
        Export CSV
      </button>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-4 items-center">
      <input
        v-model="search"
        placeholder="Search by name or farm"
        class="w-64 px-4 py-2 rounded border outline-none transition-shadow"
        style="background-color: var(--color-bg-muted); border-color: var(--color-border); color: var(--color-text);"
      />

      <select
        v-model="selectedLocation"
        class="px-3 py-2 rounded border text-sm"
        style="background-color: var(--color-bg-muted); border-color: var(--color-border); color: var(--color-text);"
      >
        <option value="">All Locations</option>
        <option v-for="loc in uniqueLocations" :key="loc" :value="loc">{{ loc }}</option>
      </select>
    </div>

    <!-- Farmer Table -->
    <div class="overflow-x-auto rounded shadow mt-4" style="background-color: var(--color-bg); color: var(--color-text);">
      <table class="min-w-full text-sm">
        <thead class="text-left" style="background-color: var(--color-bg-muted); border-bottom: 1px solid var(--color-border);">
          <tr>
            <th class="px-4 py-3">Name</th>
            <th class="px-4 py-3">Farm</th>
            <th class="px-4 py-3">Email</th>
            <th class="px-4 py-3">Location</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="farmer in filteredFarmers"
            :key="farmer.id"
            class="border-b transition-colors"
            style="border-color: var(--color-border);"
            @mouseover="$event.currentTarget.style.backgroundColor = 'var(--color-bg-muted)'"
            @mouseleave="$event.currentTarget.style.backgroundColor = 'transparent'"
          >
            <td class="px-4 py-2 font-medium">{{ farmer.name }}</td>
            <td class="px-4 py-2">{{ farmer.farm_name }}</td>
            <td class="px-4 py-2">{{ farmer.email }}</td>
            <td class="px-4 py-2">{{ farmer.location }}</td>
            <td class="px-4 py-2">
              <span
                :class="[
                  'text-xs font-semibold px-2 py-1 rounded',
                  farmer.active
                    ? 'bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]'
                    : 'bg-gray-200 text-gray-600'
                ]"
              >
                {{ farmer.active ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="px-4 py-2 space-x-2 whitespace-nowrap">
              <button
                class="text-sm font-medium text-[var(--color-primary-dark)] hover:underline"
                @click="selectedFarmer = farmer"
              >
                View
              </button>
              <button
                class="text-sm font-medium text-[var(--color-secondary-dark)] hover:underline"
                @click="impersonate(farmer)"
              >
                Impersonate
              </button>
              <button
                class="text-sm font-medium text-red-600 hover:underline"
                @click="toggleStatus(farmer)"
              >
                {{ farmer.active ? 'Deactivate' : 'Activate' }}
              </button>
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
const selectedLocation = ref('')
const selectedFarmer = ref(null)

const farmers = ref([
  {
    id: 1,
    name: 'Farmer John',
    farm_name: 'Green Valley Farms',
    email: 'john@farm.com',
    contact: '0917-123-4567',
    location: 'Bulacan',
    active: true,
  },
  {
    id: 2,
    name: 'Farmer Jane',
    farm_name: 'AgriTech Co-op',
    email: 'jane@farm.com',
    contact: '0920-555-8899',
    location: 'Laguna',
    active: false,
  },
])

const filteredFarmers = computed(() => {
  return farmers.value.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.value.toLowerCase()) ||
      f.farm_name.toLowerCase().includes(search.value.toLowerCase())

    const matchesLocation = selectedLocation.value
      ? f.location === selectedLocation.value
      : true

    return matchesSearch && matchesLocation
  })
})

const uniqueLocations = computed(() => {
  return [...new Set(farmers.value.map(f => f.location))]
})

const toggleStatus = (farmer) => {
  farmer.active = !farmer.active
}

const impersonate = (farmer) => {
  alert(`Impersonating ${farmer.name}...`)
}

const exportCSV = () => {
  const header = ['Name', 'Farm', 'Email', 'Location', 'Status']
  const rows = farmers.value.map(f =>
    [f.name, f.farm_name, f.email, f.location, f.active ? 'Active' : 'Inactive']
  )

  const csvContent = [header, ...rows]
    .map(e => e.map(field => `"${field}"`).join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'farmers.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

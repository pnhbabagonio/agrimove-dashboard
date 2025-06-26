<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Pricing</h1>

    <!-- Pricing Table -->
    <div class="overflow-x-auto bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 class="text-lg font-semibold mb-4">Time-Based Rates</h2>
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 dark:bg-gray-700 text-left">
          <tr>
            <th class="px-4 py-2">Rate (₱/km)</th>
            <th class="px-4 py-2">Valid From</th>
            <th class="px-4 py-2">Valid To</th>
            <th class="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="rate in pricing"
            :key="rate.id"
            class="border-b"
            :class="{ 'bg-red-100 dark:bg-red-900': isOverlapping(rate) }"
          >
            <td class="px-4 py-2">₱{{ rate.rate_per_km }}</td>
            <td class="px-4 py-2">{{ rate.valid_from }}</td>
            <td class="px-4 py-2">{{ rate.valid_to }}</td>
            <td class="px-4 py-2">
              <span
                :class="[
                  'text-xs px-2 py-1 rounded',
                  isOverlapping(rate)
                    ? 'bg-red-200 text-red-800'
                    : 'bg-green-200 text-green-800',
                ]"
              >
                {{ isOverlapping(rate) ? 'Overlap' : 'Valid' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Calculator -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 class="text-lg font-semibold mb-4">Cost Calculator</h2>
      <div class="flex items-center gap-4 mb-4">
        <label>Distance (km):</label>
        <input
          type="number"
          v-model.number="distanceKm"
          min="0"
          class="border px-3 py-1 rounded w-24"
        />
      </div>
      <div>
        <p class="text-lg font-bold">
          Estimated Cost:
          <span class="text-blue-600 dark:text-blue-400">₱{{ estimatedCost }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { isBefore, isAfter, parseISO } from 'date-fns'

const pricing = ref([
  {
    id: 1,
    rate_per_km: 10,
    valid_from: '2025-06-01',
    valid_to: '2025-06-30',
  },
  {
    id: 2,
    rate_per_km: 12,
    valid_from: '2025-06-25',
    valid_to: '2025-07-10',
  },
])

const isOverlapping = (rate) => {
  return pricing.value.some((r) => {
    if (r.id === rate.id) return false
    const startA = parseISO(rate.valid_from)
    const endA = parseISO(rate.valid_to)
    const startB = parseISO(r.valid_from)
    const endB = parseISO(r.valid_to)

    return (
      (isBefore(startA, endB) && isAfter(endA, startB)) ||
      (isBefore(startB, endA) && isAfter(endB, startA))
    )
  })
}

const distanceKm = ref(0)

const currentRate = computed(() => {
  const today = new Date()
  return (
    pricing.value.find((rate) => {
      const start = new Date(rate.valid_from)
      const end = new Date(rate.valid_to)
      return today >= start && today <= end
    }) || { rate_per_km: 0 }
  )
})

const estimatedCost = computed(() =>
  (distanceKm.value * currentRate.value.rate_per_km).toFixed(2)
)
</script>

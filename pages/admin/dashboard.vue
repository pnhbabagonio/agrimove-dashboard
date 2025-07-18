<template>
  <div v-if="isAllowed" class="space-y-6">
    <h1 class="text-2xl font-bold">Admin Dashboard</h1>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Shipments" icon="box" :value="stats.shipments" />
      <StatCard title="Active Drivers" icon="truck" :value="stats.drivers" />
      <StatCard title="Revenue (30d)" icon="currency-dollar" :value="formatCurrency(stats.revenue)" />
      <StatCard title="Pending Payments" icon="credit-card" :value="stats.pendingPayments" />
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 class="text-lg font-semibold mb-4">Shipment Status</h2>
        <PieChart :data="charts.shipmentStatus" />
      </div>

      <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 class="text-lg font-semibold mb-4">Revenue Trend (30d)</h2>
        <LineChart :data="charts.revenueTrend" />
      </div>
    </div>

    <!-- Map Placeholder -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 class="text-lg font-semibold mb-4">Live Driver Locations</h2>
      <img
        src="https://th.bing.com/th/id/R.0fad1c6949f1f5438eab708cf4d6fb91?rik=62312%2bcQmhUIVA&riu=http%3a%2f%2ffiles01.pna.gov.ph%2fograph%2f2018%2f07%2f04%2fKabacan+Map+3_5b3c24dab37c70_43445874.jpg&ehk=Ax5z%2ftOn%2bkEyUZt%2fUvLzEEmGRVxrx4POXreM%2bRK8sqw%3d&risl=&pid=ImgRaw&r=0"
        alt="Map placeholder"
        class="rounded w-full"
      />
    </div>
  </div>

  <!-- Not Allowed Message -->
  <div v-else class="p-6 text-red-600 dark:text-red-400">
    You are not authorized to access this page.
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth' // must exist
import { ref, computed, onMounted } from 'vue'

import StatCard from '@/components/dashboard/StatCard.vue'
import PieChart from '@/components/charts/PieChart.vue'
import LineChart from '@/components/charts/LineChart.vue'

const { user } = useAuth()
const router = useRouter()

const isAllowed = computed(() => user.value?.role === 'admin')

onMounted(() => {
  if (!isAllowed.value) {
    // Optional: redirect if not allowed
    router.replace('/unauthorized')
  }
})

// Another option - see which works best 
// onMounted(() => {
//   if (user.value.role !== 'admin') {
//     router.replace('/unauthorized')
//   }
// })

const stats = ref({
  shipments: 1280,
  drivers: 57,
  revenue: 47200,
  pendingPayments: 12,
})

const charts = ref({
  shipmentStatus: {
    labels: ['Delivered', 'In Transit', 'Pending', 'Cancelled'],
    values: [700, 300, 180, 100],
  },
  revenueTrend: {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    values: Array.from({ length: 30 }, () => Math.floor(Math.random() * 2000 + 1000)),
  },
})

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
</script>

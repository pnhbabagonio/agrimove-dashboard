<template>
  <div v-if="isAllowed" class="space-y-4 p-4 max-w-screen-2xl mx-auto">
     <!-- Welcome Card (more compact) -->
        <div class="lg:col-span-1 rounded-lg shadow p-4 text-white flex flex-col justify-center"
      style="background: linear-gradient(to right, var(--color-primary), #fde047); min-height: 120px;">
        <h2 class="text-xl font-bold mb-1">Welcome back, Admin!</h2>
        <p class="text-xs opacity-90">Manage applications, monitor logistics</p>
      </div>
    <!-- Top Section - Welcome and Stats -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
    
      <!-- Main Metrics (3/4 width) -->
      <div class="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard title="Total Shipments" icon="box" :value="stats.shipments" />
        <StatCard title="Revenue (30d)" icon="currency-dollar" :value="formatCurrency(stats.revenue)" />
        <StatCard title="New Drivers" icon="user-add" :value="applicants.drivers.length" />
        <StatCard title="New Farmers" icon="user-group" :value="applicants.farmers.length" />
      </div>
    </div>

    <!-- Middle Section - Applicants and Calendar -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Applicants (2/3 width) -->
      <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-card p-4 rounded shadow">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <Icon name="truck" size="18" /> New Driver Applicants
          </h3>
          <ul class="space-y-2">
            <li
              v-for="driver in applicants.drivers"
              :key="driver.id"
              class="p-2 rounded bg-muted hover:bg-primary/10 transition text-sm"
            >
              <p class="font-medium">{{ driver.name }}</p>
              <p class="text-muted-foreground text-xs">Vehicle: {{ driver.vehicle }}</p>
            </li>
          </ul>
        </div>

        <div class="bg-card p-4 rounded shadow">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <Icon name="leaf" size="18" /> New Farmer Applicants
          </h3>
          <ul class="space-y-2">
            <li
              v-for="farmer in applicants.farmers"
              :key="farmer.id"
              class="p-2 rounded bg-muted hover:bg-primary/10 transition text-sm"
            >
              <p class="font-medium">{{ farmer.name }}</p>
              <p class="text-muted-foreground text-xs">Farm: {{ farmer.farm }}</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- Calendar (1/3 width - taller) -->
      <div class="bg-card p-4 rounded-lg shadow">
        <h2 class="text-base font-semibold mb-3 flex items-center gap-2">
          <Icon name="calendar" size="18" /> This Month
        </h2>
        <div class="h-[320px]"> <!-- Increased height -->
          <VueCal
            class="vuecal--full-height"
            default-view="month"
            hide-title
            hide-view-selector
            :time="false"
            :events="calendarEvents"
          />
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="bg-card p-4 rounded shadow">
        <h3 class="font-semibold mb-3 flex items-center gap-2">
          <Icon name="pie-chart" size="18" /> Shipment Status
        </h3>
        <div class="h-72"> <!-- Slightly taller -->
          <PieChart :data="charts.shipmentStatus" />
        </div>
      </div>
      <div class="bg-card p-4 rounded shadow">
        <h3 class="font-semibold mb-3 flex items-center gap-2">
          <Icon name="trending-up" size="18" /> Revenue Trend
        </h3>
        <div class="h-72"> <!-- Slightly taller -->
          <LineChart :data="charts.revenueTrend" />
        </div>
      </div>
    </div>

    <!-- Map Section -->
    <div class="bg-card p-4 rounded shadow">
      <h3 class="font-semibold mb-3 flex items-center gap-2">
        <Icon name="map-pin" size="18" /> Live Driver Locations
      </h3>
      <div class="h-96 rounded overflow-hidden bg-gray-100 relative"> <!-- Taller map -->
        <img
          src="https://th.bing.com/th/id/R.0fad1c6949f1f5438eab708cf4d6fb91?rik=62312%2bcQmhUIVA&riu=http%3a%2f%2ffiles01.pna.gov.ph%2fograph%2f2018%2f07%2f04%2fKabacan+Map+3_5b3c24dab37c70_43445874.jpg&ehk=Ax5z%2ftOn%2bkEyUZt%2fUvLzEEmGRVxrx4POXreM%2bRK8sqw%3d&risl=&pid=ImgRaw&r=0"
          alt="Map placeholder"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-primary/10 pointer-events-none"></div>
      </div>
    </div>
  </div>

  <!-- Unauthorized -->
  <div v-else class="p-6 text-red-600">You are not authorized to access this page.</div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

import StatCard from '@/components/dashboard/StatCard.vue'
import PieChart from '@/components/charts/PieChart.vue'
import LineChart from '@/components/charts/LineChart.vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

const { user } = useAuth()
const router = useRouter()

const isAllowed = computed(() => user.value?.role === 'admin')

onMounted(() => {
  if (!isAllowed.value) router.replace('/unauthorized')
})

// Dashboard stats
const stats = ref({
  shipments: 1280,
  drivers: 57,
  revenue: 47200,
  pendingPayments: 12,
})

// Chart Data
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

// Applicants
const applicants = ref({
  drivers: [
    { id: 1, name: 'John Dela Cruz', vehicle: 'Tricycle' },
    { id: 2, name: 'Maria Lopez', vehicle: 'Pickup Truck' },
  ],
  farmers: [
    { id: 1, name: 'Pedro Santos', farm: 'Green Field Farms' },
    { id: 2, name: 'Liza Reyes', farm: 'AgriCoop PH' },
  ],
})

// Events for calendar
const calendarEvents = [
  { start: '2025-08-02', end: '2025-08-02', title: 'Driver Orientation' },
  { start: '2025-08-10', end: '2025-08-10', title: 'National Farmers Day' },
  { start: '2025-08-15', end: '2025-08-15', title: 'System Maintenance' },
]

// Utilities
const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
</script>

<style>
.vuecal--full-height {
  height: 100% !important;
}

.vuecal__header {
  padding: 4px 0 !important;
}

.vuecal__weekdays-headings {
  padding: 4px 0 !important;
}

.vuecal__month-view .vuecal__cell {
  height: 36px !important;
  min-height: 36px !important;
}
</style>
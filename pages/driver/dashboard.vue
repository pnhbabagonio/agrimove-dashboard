<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Hello, {{ user.name }}</h1>

    <!-- Assigned Shipments -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 class="text-lg font-semibold mb-4">📦 Today’s Shipments</h2>
      <ul class="space-y-2 text-sm">
        <li v-for="shipment in todayShipments" :key="shipment.id" class="border-b pb-2">
          <div class="flex justify-between">
            <span>#{{ shipment.id }} – {{ shipment.status }}</span>
            <span class="text-gray-500 text-xs">{{ shipment.time }}</span>
          </div>
          <div class="text-xs text-gray-400">From {{ shipment.pickup }} to {{ shipment.dropoff }}</div>
        </li>
      </ul>
    </div>

    <!-- Earnings Estimate -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 class="text-lg font-semibold mb-4">💰 Earnings Estimate</h2>
      <p class="text-2xl font-bold text-green-600 dark:text-green-400">₱{{ earningsTotal.toLocaleString() }}</p>
      <p class="text-sm text-gray-500">Based on {{ todayShipments.length }} shipments</p>
    </div>

    <!-- Delivery Timeline -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 class="text-lg font-semibold mb-4">📍 Timeline</h2>
      <ul class="space-y-2 text-sm">
        <li v-for="(event, i) in timeline" :key="i" class="flex gap-2 items-start">
          <span class="w-2 h-2 mt-1 rounded-full" :class="event.color"></span>
          <div>
            <p>{{ event.label }}</p>
            <p class="text-xs text-gray-400">{{ event.time }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()

const todayShipments = [
  { id: 301, pickup: 'Farm C', dropoff: 'Market Z', status: 'In Transit', time: '9:00 AM' },
  { id: 302, pickup: 'Farm D', dropoff: 'Warehouse 5', status: 'Scheduled', time: '1:00 PM' },
]

const earningsTotal = todayShipments.length * 750 // dummy multiplier

const timeline = [
  { label: 'Shipment #301 picked up', time: '9:15 AM', color: 'bg-blue-500' },
  { label: 'In transit to Market Z', time: '10:00 AM', color: 'bg-yellow-500' },
  { label: 'Next stop: Warehouse 5', time: 'Upcoming', color: 'bg-gray-400' },
]
</script>

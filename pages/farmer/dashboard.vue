<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Welcome, {{ user.name }}</h1>

    <!-- Pending Shipments -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 class="text-lg font-semibold mb-4">📦 Pending Shipments</h2>
      <ul class="space-y-2 text-sm">
        <li v-for="shipment in pendingShipments" :key="shipment.id" class="border-b py-2">
          <div class="flex justify-between">
            <span>Shipment #{{ shipment.id }} – {{ shipment.status }}</span>
            <span class="text-gray-500">{{ shipment.date }}</span>
          </div>
          <div class="text-xs text-gray-400">Pickup: {{ shipment.pickup }} → Delivery: {{ shipment.delivery }}</div>
        </li>
      </ul>
    </div>

    <!-- Payment Status -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 class="text-lg font-semibold mb-4">💳 Payments</h2>
      <ul class="space-y-2 text-sm">
        <li v-for="payment in payments" :key="payment.id" class="flex justify-between border-b pb-2">
          <span>Invoice #{{ payment.id }}</span>
          <span
            :class="[
              'text-xs px-2 py-1 rounded',
              payment.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            ]"
          >
            {{ payment.status }}
          </span>
        </li>
      </ul>
    </div>

    <!-- Review Summary -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 class="text-lg font-semibold mb-4">📝 My Reviews</h2>
      <ul class="space-y-3 text-sm">
        <li v-for="review in reviews" :key="review.id">
          <p>"{{ review.comment }}"</p>
          <div class="text-yellow-400 text-xs">
            <span v-for="n in review.rating" :key="n">★</span>
            <span v-for="n in 5 - review.rating" :key="5 + n" class="text-gray-300">★</span>
          </div>
          <p class="text-gray-400 text-xs">For: {{ review.driver }} on {{ review.date }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()

const pendingShipments = [
  { id: 201, status: 'Scheduled', pickup: 'Farm A', delivery: 'Market X', date: 'June 27' },
  { id: 202, status: 'Waiting for Pickup', pickup: 'Farm A', delivery: 'Market Y', date: 'June 28' },
]

const payments = [
  { id: 5001, status: 'pending' },
  { id: 5002, status: 'completed' },
]

const reviews = [
  { id: 1, driver: 'Driver A', rating: 5, comment: 'Very professional', date: 'June 20' },
  { id: 2, driver: 'Driver B', rating: 4, comment: 'Arrived a bit late', date: 'June 15' },
]
</script>

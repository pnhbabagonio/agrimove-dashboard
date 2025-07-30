<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Shipments</h1>

    <!-- Filters -->
    <div class="flex flex-wrap gap-4 items-center">
      <select v-model="filter.status" class="border px-3 py-1 rounded">
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in_transit">In Transit</option>
        <option value="delivered">Delivered</option>
      </select>

      <input v-model="filter.farmerId" placeholder="Farmer ID" class="border px-3 py-1 rounded" />
    </div>

    <!-- Shipment Table -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        class="overflow-x-auto p-4 rounded shadow"
        style="background-color: var(--color-bg); color: var(--color-text);">
        <table class="min-w-full text-sm">
          <thead
            style="background-color: var(--color-bg-muted); color: var(--color-text);"
            class="text-left">
            <tr>
              <th class="px-4 py-2">ID</th>
              <th class="px-4 py-2">Farmer</th>
              <th class="px-4 py-2">Status</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="shipment in filteredShipments"
              :key="shipment.id"
              class="border-b transition-colors"
              style="border-color: var(--color-border);"
              @mouseover="$event.currentTarget.style.backgroundColor = 'var(--color-bg-muted)'"
              @mouseleave="$event.currentTarget.style.backgroundColor = 'transparent'"
            >
              <td class="px-4 py-2">{{ shipment.id }}</td>
              <td class="px-4 py-2">{{ shipment.farmer }}</td>
              <td class="px-4 py-2 capitalize">{{ shipment.status }}</td>
              <td class="px-4 py-2">
                <button @click="selectedShipment = shipment" class="text-blue-600 hover:underline">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Map or Details -->
    <div v-if="selectedShipment" class="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 class="text-lg font-semibold mb-2">Shipment #{{ selectedShipment.id }}</h2>
      <p><strong>Status:</strong> {{ selectedShipment.status }}</p>
      <p><strong>Pickup:</strong> {{ selectedShipment.pickup_location }}</p>
      <p><strong>Delivery:</strong> {{ selectedShipment.delivery_location }}</p>

      <!-- Assign Driver -->
      <div class="mt-4">
        <label class="block text-sm mb-1">Assign Driver:</label>
        <select v-model="selectedShipment.driver_id" class="border px-3 py-1 rounded w-full">
          <option disabled value="">Select Driver</option>
          <option v-for="driver in drivers" :key="driver.id" :value="driver.id">
            {{ driver.name }}
          </option>
        </select>
      </div>

      <!-- Shipment Items -->
      <div class="mt-4">
        <p class="font-semibold">Items:</p>
        <ul class="list-disc ml-6 text-sm">
          <li v-for="item in selectedShipment.items" :key="item.id">
            {{ item.product }} – {{ item.weight }}kg
          </li>
        </ul>
      </div>

      <!-- Mini Map -->
      <div class="mt-4">
        <p class="font-semibold mb-2">Tracking Map:</p>
        <ShipmentTrackingMap
          :pickup="[14.5547, 121.0244]"
          :delivery="[14.5995, 120.9842]"
          :driver="[14.575, 121.005]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ShipmentTrackingMap from '@/components/maps/ShipmentTrackingMap.vue'


const filter = ref({
  status: '',
  farmerId: '',
})

const shipments = ref([
  {
    id: 101,
    farmer: 'Farmer John',
    status: 'pending',
    pickup_location: 'Farm A',
    delivery_location: 'Market B',
    driver_id: '',
    items: [
      { id: 1, product: 'Tomatoes', weight: 50 },
      { id: 2, product: 'Onions', weight: 30 },
    ],
  },
  {
    id: 102,
    farmer: 'Farmer Jane',
    status: 'in_transit',
    pickup_location: 'Farm B',
    delivery_location: 'Store X',
    driver_id: '',
    items: [
      { id: 3, product: 'Eggplant', weight: 40 },
    ],
  },
])

const drivers = ref([
  { id: 1, name: 'Driver A', available: true },
  { id: 2, name: 'Driver B', available: true },
])

const selectedShipment = ref(null)

const filteredShipments = computed(() => {
  return shipments.value.filter((s) => {
    return (
      (!filter.value.status || s.status === filter.value.status) &&
      (!filter.value.farmerId || s.farmer.includes(filter.value.farmerId))
    )
  })
})
</script>

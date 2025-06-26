<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Notifications</h1>

    <div class="flex items-center gap-4">
      <button
        @click="markAllAsRead"
        class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
      >
        Mark all as read
      </button>
      <select v-model="filter" class="border px-3 py-1 rounded">
        <option value="">All</option>
        <option value="shipment">Shipment</option>
        <option value="payment">Payment</option>
        <option value="review">Review</option>
      </select>
    </div>

    <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        <li
          v-for="(n, index) in filteredNotifications"
          :key="n.id"
          @click="markAsRead(index)"
          class="py-3 px-2 cursor-pointer transition"
          :class="{
            'bg-gray-100 dark:bg-gray-700': !n.read,
            'hover:bg-gray-100 dark:hover:bg-gray-700': true
          }"
        >
          <div class="flex justify-between items-start">
            <div class="flex items-start gap-2">
              <span class="text-xl">
                {{ typeIcon(n.type) }}
              </span>
              <div>
                <p class="text-sm" :class="{ 'font-semibold': !n.read }">
                  {{ n.message }}
                </p>
                <p class="text-xs text-gray-400 italic">From: {{ n.role }}</p>
              </div>
            </div>
            <span class="text-xs text-gray-400">{{ n.time }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useNotifications } from '@/composables/useNotifications'

const { notifications, markAsRead, markAllAsRead } = useNotifications()

const filter = ref('')
const filteredNotifications = computed(() =>
  filter.value
    ? notifications.value.filter((n) => n.type === filter.value)
    : notifications.value
)

const typeIcon = (type) => {
  switch (type) {
    case 'shipment': return '📦'
    case 'payment': return '💰'
    case 'review': return '⭐'
    default: return '🔔'
  }
}
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Payments</h1>

    <!-- Batch Actions -->
    <div class="flex items-center gap-4">
      <button
        class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        @click="markSelectedAsPaid"
        :disabled="selectedPayments.length === 0"
      >
        Mark as Paid
      </button>
      <button
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        @click="exportToCSV"
      >
        Export to CSV
      </button>
    </div>

    <!-- Payments Table -->
    <div
      class="overflow-x-auto p-4 rounded shadow"
      style="background-color: var(--color-bg); color: var(--color-text);"
    >
      <table class="min-w-full text-sm">
        <thead
          class="text-left"
          style="background-color: var(--color-bg-muted); color: var(--color-text);"
        >
          <tr>
            <th class="px-4 py-2">
              <input type="checkbox" @change="toggleAll" :checked="isAllSelected" />
            </th>
            <th class="px-4 py-2">Recipient</th>
            <th class="px-4 py-2">Role</th>
            <th class="px-4 py-2">Amount</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Date</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="payment in payments"
            :key="payment.id"
            class="border-b transition-colors"
            style="border-color: var(--color-border);"
            @mouseover="$event.currentTarget.style.backgroundColor = 'var(--color-bg-muted)'"
            @mouseleave="$event.currentTarget.style.backgroundColor = 'transparent'"
          >
            <td class="px-4 py-2">
              <input
                type="checkbox"
                :value="payment.id"
                v-model="selectedPayments"
              />
            </td>
            <td class="px-4 py-2">{{ payment.recipient }}</td>
            <td class="px-4 py-2 capitalize">{{ payment.role }}</td>
            <td class="px-4 py-2">₱{{ payment.amount.toFixed(2) }}</td>
            <td class="px-4 py-2">
              <span
                class="text-xs px-2 py-1 rounded"
                :class="payment.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'"
              >
                {{ payment.status }}
              </span>
            </td>
            <td class="px-4 py-2">{{ payment.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const payments = ref([
  { id: 1, recipient: 'Farmer John', role: 'farmer', amount: 3200, status: 'pending', date: '2025-06-20' },
  { id: 2, recipient: 'Driver Dan', role: 'driver', amount: 1800, status: 'completed', date: '2025-06-22' },
  { id: 3, recipient: 'Farmer Jane', role: 'farmer', amount: 2750, status: 'pending', date: '2025-06-23' },
])

const selectedPayments = ref([])

const isAllSelected = computed(() => selectedPayments.value.length === payments.value.length)

const toggleAll = (e) => {
  if (e.target.checked) {
    selectedPayments.value = payments.value.map(p => p.id)
  } else {
    selectedPayments.value = []
  }
}

const markSelectedAsPaid = () => {
  payments.value = payments.value.map(p =>
    selectedPayments.value.includes(p.id)
      ? { ...p, status: 'completed' }
      : p
  )
  selectedPayments.value = []
}

const exportToCSV = () => {
  const rows = [['ID', 'Recipient', 'Role', 'Amount', 'Status', 'Date']]
  payments.value.forEach(p => {
    rows.push([p.id, p.recipient, p.role, p.amount, p.status, p.date])
  })

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    rows.map(e => e.join(',')).join('\n')

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', 'payments.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

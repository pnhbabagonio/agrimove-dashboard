<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Analytics</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 class="text-lg font-semibold mb-4">Shipment Status</h2>
        <PieChart :data="charts.shipmentStatus" />
      </div>

      <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 class="text-lg font-semibold mb-4">Revenue Trend (30d)</h2>
        <LineChart :data="charts.revenueTrend" />
      </div>

      <div class="bg-white dark:bg-gray-800 p-4 rounded shadow col-span-full">
        <h2 class="text-lg font-semibold mb-4">Shipments per Driver</h2>
        <BarChart :data="charts.driverShipments" />
      </div>
    </div>
  </div>
</template>

<script setup>
import PieChart from '@/components/charts/PieChart.vue'
import LineChart from '@/components/charts/LineChart.vue'
import BarChart from '@/components/charts/BarChart.vue'

const charts = {
  shipmentStatus: {
    labels: ['Delivered', 'In Transit', 'Pending'],
    values: [45, 12, 6],
  },
  revenueTrend: {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    values: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1500) + 500),
  },
  driverShipments: {
    labels: ['Driver A', 'Driver B', 'Driver C'],
    values: [15, 9, 12],
  },
}
</script>

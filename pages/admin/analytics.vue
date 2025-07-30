<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="rounded-lg shadow p-6 text-white"
      style="background: linear-gradient(to right, #16a34a, #a3e635);"
    >
      <h1 class="text-3xl font-bold mb-2">Analytics Overview</h1>
      <p class="text-base">Visual insights into your shipment and revenue performance.</p>
    </div>

    <!-- Chart Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Shipment Status Pie Chart -->
      <div class="bg-white border border-green-200 rounded-lg shadow-sm p-5">
        <h2 class="text-green-700 text-lg font-semibold mb-4">Shipment Status</h2>
        <PieChart :data="charts.shipmentStatus" />
      </div>

      <!-- Revenue Trend Line Chart -->
      <div class="bg-white border border-green-200 rounded-lg shadow-sm p-5">
        <h2 class="text-green-700 text-lg font-semibold mb-4">Revenue Trend (30d)</h2>
        <LineChart :data="charts.revenueTrend" />
      </div>

      <!-- Driver Shipments Bar Chart -->
      <div class="bg-white border border-green-200 rounded-lg shadow-sm p-5 col-span-full">
        <h2 class="text-green-700 text-lg font-semibold mb-4">Shipments per Driver</h2>
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

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  data: Object,
})

const chartData = computed(() => ({
  labels: props.data.labels,
  datasets: [
    {
      label: 'Shipments',
      backgroundColor: '#3B82F6',
      data: props.data.values,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
}
</script>

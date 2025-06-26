<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const chartData = computed(() => ({
  labels: props.data.labels,
  datasets: [
    {
      label: 'Revenue ($)',
      data: props.data.values,
      fill: false,
      borderColor: '#3B82F6',
      tension: 0.3,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
  },
}
</script>

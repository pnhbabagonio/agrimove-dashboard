<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

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
      data: props.data.values,
      backgroundColor: ['#3B82F6', '#F59E0B', '#10B981', '#EF4444'],
    },
  ],
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center gap-4">
    <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
      <component :is="iconComponent" class="h-6 w-6" />
    </div>
    <div>
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ title }}</p>
      <p class="text-xl font-semibold text-gray-900 dark:text-white">{{ value }}</p>
    </div>
  </div>
</template>

<script setup>
import {
  TruckIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  ArchiveIcon,
} from '@heroicons/vue/outline'

const props = defineProps({
  title: String,
  value: [String, Number],
  icon: {
    type: String,
    default: 'archive',
  },
})

const iconMap = {
  truck: TruckIcon,
  'credit-card': CreditCardIcon,
  'currency-dollar': CurrencyDollarIcon,
  box: ArchiveIcon,
}

const iconComponent = computed(() => iconMap[props.icon] || ArchiveIcon)
</script>

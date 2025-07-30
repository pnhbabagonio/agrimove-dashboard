<template>
  <NuxtLink
    :to="to"
    class="group flex items-center gap-3 p-3 rounded-md transition-all duration-200
           text-gray-700 dark:text-white hover:bg-green-100 dark:hover:bg-green-700"
    :aria-label="collapsed ? label : null"
  >
    <component
      :is="iconComponent"
      class="w-5 h-5 text-green-600 group-hover:text-green-700 transition duration-200"
    />
    <span
      v-if="!collapsed"
      class="truncate font-medium text-gray-700 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-200"
    >
      {{ label }}
    </span>
  </NuxtLink>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import {
  HomeIcon,
  UsersIcon,
  TruckIcon,
  AdjustmentsIcon,
  CashIcon,
  CreditCardIcon,
  ChartBarIcon,
  StarIcon,
  LocationMarkerIcon,
  CurrencyDollarIcon,
  ArchiveIcon,
} from '@heroicons/vue/outline'

const icons = {
  home: HomeIcon,
  users: UsersIcon,
  truck: TruckIcon,
  leaf: AdjustmentsIcon,
  cash: CashIcon,
  'credit-card': CreditCardIcon,
  'chart-bar': ChartBarIcon,
  star: StarIcon,
  'location-marker': LocationMarkerIcon,
  'currency-dollar': CurrencyDollarIcon,
  box: ArchiveIcon,
}

const props = defineProps({
  label: String,
  icon: String,
  to: String,
  collapsed: Boolean,
})

const iconComponent = computed(() => icons[props.icon] || HomeIcon)
</script>

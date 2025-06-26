<template>
  <NuxtLink :to="to" class="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white rounded-md transition-all">
    <component :is="iconComponent" class="w-5 h-5" />
    <span v-if="!collapsed" class="truncate">{{ label }}</span>
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
  ArchiveIcon, // ✅ Replaces BoxIcon
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
  box: ArchiveIcon, // 👈 update this line
}


const props = defineProps({
  label: String,
  icon: String,
  to: String,
  collapsed: Boolean,
})

const iconComponent = computed(() => icons[props.icon] || HomeIcon)
</script>

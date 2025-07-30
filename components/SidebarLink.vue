<template>
  <NuxtLink
    :to="to"
    class="group flex items-center gap-3 p-3 rounded-md transition-all duration-200 hover:bg-[var(--color-primary-light)]"
    :aria-label="collapsed ? label : null"
    style="color: var(--color-text)"
  >
    <!-- Icon -->
    <component
      :is="iconComponent"
      class="w-5 h-5 transition duration-200"
      style="color: var(--color-primary)"
    />

    <!-- Label -->
    <span
      v-if="!collapsed"
      class="truncate font-medium transition-colors duration-200 group-hover:text-[var(--color-primary-dark)]"
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

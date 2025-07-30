<template>
  <div
    class="rounded-lg shadow p-6 min-h-[120px] flex items-center gap-6"
    style="background-color: var(--color-bg);"
  >
    <div
      class="p-4 rounded-full"
      style="background-color: var(--color-primary);"
    >
      <component
        :is="iconComponent"
        class="h-7 w-7"
        style="
          color: white;
          stroke: white;
          stroke-width: 1.5;
        "
      />
    </div>
    <div>
      <p class="text-base" style="color: var(--color-text-muted);">
        {{ title }}
      </p>
      <p class="text-2xl font-semibold" style="color: var(--color-text);">
        {{ value }}
      </p>
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

<template>
  <aside :class="['h-screen bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out', collapsed ? 'w-16' : 'w-64']">
    <!-- Logo -->
    <div class="flex items-center justify-between p-4">
      <Logo v-if="!collapsed" />
      <button @click="$emit('toggle')" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
        <svg v-if="collapsed" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="mt-6">
      <SidebarLink v-for="item in filteredLinks" :key="item.label" :icon="item.icon" :label="item.label" :to="item.to" :collapsed="collapsed" />
    </nav>
  </aside>
</template>

<script setup>
import SidebarLink from './SidebarLink.vue'
import Logo from './Logo.vue'

const props = defineProps({
  userRole: String,
  collapsed: Boolean,
})

const allLinks = {
  admin: [
    { label: 'Dashboard', to: '/admin/dashboard', icon: 'home' },
    { label: 'Users', to: '/admin/users', icon: 'users' },
    { label: 'Farmers', to: '/admin/farmers', icon: 'leaf' },
    { label: 'Drivers', to: '/admin/drivers', icon: 'truck' },
    { label: 'Pricing', to: '/admin/pricing', icon: 'cash' },
    { label: 'Shipments', to: '/admin/shipments', icon: 'box' },
    { label: 'Payments', to: '/admin/payments', icon: 'credit-card' },
    { label: 'Analytics', to: '/admin/analytics', icon: 'chart-bar' },
  ],
  farmer: [
    { label: 'Shipments', to: '/shipments', icon: 'box' },
    { label: 'Payments', to: '/payments', icon: 'credit-card' },
    { label: 'Reviews', to: '/reviews', icon: 'star' },
  ],
  driver: [
    { label: 'Assigned Shipments', to: '/shipments', icon: 'truck' },
    { label: 'Tracking', to: '/tracking', icon: 'location-marker' },
    { label: 'Earnings', to: '/earnings', icon: 'currency-dollar' },
  ],
}

const filteredLinks = computed(() => allLinks[props.userRole] || [])
</script>

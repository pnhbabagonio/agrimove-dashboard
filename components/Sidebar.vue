<template>
  <!-- Fixed sidebar on the left -->
  <aside
    :class="[
      'fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out shadow-lg z-20 flex flex-col',
      collapsed ? 'w-16' : 'w-64'
    ]"
    class="bg-[var(--color-bg)]"
  >
    <!-- Fixed Logo + Collapse Button -->
    <div
      class="flex items-center justify-between p-4 border-b bg-[var(--color-bg)]"
      :style="{ borderColor: 'var(--color-border)' }"
    >
      <Logo v-if="!collapsed" />

      <button
        @click="$emit('toggle')"
        class="p-1 rounded transition"
        :style="{ color: 'var(--color-text-muted)' }"
        @mouseover="hovering = true"
        @mouseleave="hovering = false"
      >
        <svg
          v-if="collapsed"
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          :style="{ stroke: hovering ? 'var(--color-text)' : 'var(--color-text-muted)' }"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          :style="{ stroke: hovering ? 'var(--color-text)' : 'var(--color-text-muted)' }"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Scrollable navigation -->
    <nav class="flex-1 overflow-y-auto px-2 mt-4 pb-6">
      <SidebarLink
        v-for="item in filteredLinks"
        :key="item.label"
        :icon="item.icon"
        :label="item.label"
        :to="item.to"
        :collapsed="collapsed"
      />
    </nav>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import SidebarLink from './SidebarLink.vue'
import Logo from './Logo.vue'

const props = defineProps({
  userRole: String,
  collapsed: Boolean,
})

const hovering = ref(false)

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

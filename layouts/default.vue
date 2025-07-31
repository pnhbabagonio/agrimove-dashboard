<template>
  <div
    class="min-h-screen bg-[#f5f5f5] text-[var(--color-text)]"
  >
    <!-- Sidebar (fixed) -->
    <Sidebar
      v-if="showLayout"
      :userRole="userRole"
      :collapsed="isCollapsed"
      @toggle="isCollapsed = !isCollapsed"
    />

    <!-- Main Content Area -->
    <div
      :class="[
        'flex flex-col border-l transition-all duration-300',
        isCollapsed ? 'ml-16' : 'ml-64'
      ]"
      style="border-color: var(--color-border)"
    >
      <!-- Topbar -->
      <Topbar v-if="showLayout" />

      <!-- Page content -->
      <main class="p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Topbar from '@/components/Topbar.vue'
import Sidebar from '@/components/Sidebar.vue'

const route = useRoute()
const userRole = ref('admin')
const isCollapsed = ref(false)

const hideOnRoutes = ['/', '/login', '/signup/farmer', '/signup/driver']

// Check if current route starts with any excluded path
const showLayout = computed(() => {
  return !hideOnRoutes.includes(route.path)
})

</script>

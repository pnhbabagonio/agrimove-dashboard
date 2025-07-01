<template>
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-black">
    <!-- Sidebar -->
    <Sidebar
      v-if="showLayout"
      :userRole="userRole"
      :collapsed="isCollapsed"
      @toggle="isCollapsed = !isCollapsed"
    />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Topbar -->
      <Topbar v-if="showLayout" />

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

// Routes that should hide topbar/sidebar
const hideOnRoutes = ['/', '/signup/farmer', '/signup/driver']

const showLayout = computed(() => !hideOnRoutes.includes(route.path))
</script>

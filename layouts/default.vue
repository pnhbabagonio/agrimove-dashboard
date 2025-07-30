<template>
  <div class="flex min-h-screen" style="background-color: var(--color-bg); color: var(--color-text)">
    <!-- Sidebar -->
    <Sidebar
      v-if="showLayout"
      :userRole="userRole"
      :collapsed="isCollapsed"
      @toggle="isCollapsed = !isCollapsed"
    />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col border-l" style="border-color: var(--color-border)">
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

const hideOnRoutes = ['/', '/signup/farmer', '/signup/driver']
const showLayout = computed(() => !hideOnRoutes.includes(route.path))
</script>

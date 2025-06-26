
<template>
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
    <!-- Sidebar -->
    <Sidebar :userRole="userRole" :collapsed="isCollapsed" @toggle="isCollapsed = !isCollapsed" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <Topbar />

      <main class="p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import Topbar from '@/components/Topbar.vue'

const userRole = ref('admin') // Will be dynamic later
const isCollapsed = ref(false)
</script>

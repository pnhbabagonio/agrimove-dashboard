<script setup lang="ts">
import { themeColors } from '@/utils/themeColors'

// Inject theme colors as inline CSS variables on the root div
const cssVars = themeColors
</script>

<template>
  <div :style="cssVars" class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

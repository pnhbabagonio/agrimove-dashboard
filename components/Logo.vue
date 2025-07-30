<template>
  <NuxtLink
    to="/"
    class="flex items-center gap-2 text-xl font-bold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
    aria-label="Home"
  >
    <!-- Logo Icon Slot -->
    <slot name="icon">
      <!-- Default icon if none provided -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 12l2-2m0 0l7-7 7 7m-9 2v6m0 0H5a2 2 0 01-2-2v-4m12 6h4a2 2 0 002-2v-4m-6 6v-6"
        />
      </svg>
    </slot>

    <!-- Logo Text -->
    <slot name="text">
      <span>Agrimove</span>
    </slot>
  </NuxtLink>
</template>

<template>
  <NuxtLink
    to="/"
    class="flex items-center gap-2 text-xl font-bold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
    aria-label="Home"
  >
      <!-- Text slot or fallback -->
    <slot name="text">
      <span>Agrimove</span>
    </slot>

    <!-- Icon slot or fallback -->
    <slot name="icon">
      <img
        src="/images/agrimove_logo.png"
        alt="Agrimove Logo"
        class="w-12 h-12 object-contain"
      />
    </slot>
  </NuxtLink>
</template>

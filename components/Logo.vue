<template>
  <NuxtLink
    to="/"
    class="flex items-center gap-2 text-xl font-bold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
    aria-label="Home"
  >
    <!-- Icon slot or fallback -->
    <slot name="icon">
      <img
        src="/images/agrimove_logo.png"
        alt="Agrimove Logo"
        class="w-6 h-6 object-contain"
      />
    </slot>

    <!-- Text slot or fallback -->
    <slot name="text">
      <span>Agrimove</span>
    </slot>
  </NuxtLink>
</template>

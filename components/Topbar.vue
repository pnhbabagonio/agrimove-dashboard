<template>
  <header class="bg-white dark:bg-gray-800 shadow px-4 py-3 flex items-center justify-between">
    <div><slot name="left" /></div>

    <div class="flex items-center gap-4">
      <!-- Notifications -->
      <div class="relative" ref="notificationRef">
        <button @click="toggleNotifications" class="relative text-gray-600 dark:text-gray-300 hover:text-blue-600">
          <BellIcon class="h-6 w-6" />
          <span
            v-if="unreadCount > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {{ unreadCount }}
          </span>
        </button>

        <!-- Dropdown -->
        <div
          v-if="showNotifications"
          class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow z-50"
        >
          <div class="p-3 border-b dark:border-gray-600 font-semibold">Notifications</div>
          <ul class="max-h-60 overflow-y-auto text-sm">
            <li
              v-for="(n, index) in notifications"
              :key="n.id"
              class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              @click="markAsRead(index)"
            >
              <p>{{ n.message }}</p>
              <p class="text-xs text-gray-400">{{ n.time }}</p>
            </li>
          </ul>
          <div class="p-2 text-center border-t dark:border-gray-600">
            <button @click="markAllAsRead" class="text-blue-600 text-xs hover:underline">Mark all as read</button>
          </div>
        </div>
      </div>

      <!-- Theme Toggle -->
      <button @click="toggleTheme" class="text-gray-600 dark:text-gray-300 hover:text-blue-600">
        <component :is="theme === 'dark' ? SunIcon : MoonIcon" class="h-6 w-6" />
      </button>

      <!-- Profile Dropdown -->
      <div class="relative" ref="profileRef">
        <button @click="showDropdown = !showDropdown" class="flex items-center gap-2">
          <img src="https://i.pravatar.cc/40" class="w-8 h-8 rounded-full" alt="User" />
          <span class="hidden md:inline font-medium">{{ user.name }}</span>
        </button>
        <div
          v-if="showDropdown"
          class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded shadow z-50"
        >
          <div class="p-3 border-b dark:border-gray-600">
            <p class="text-sm font-semibold">{{ user.name }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-300">{{ user.role.toUpperCase() }}</p>
          </div>
          <ul class="text-sm">
            <li>
              <NuxtLink to="/profile" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Profile</NuxtLink>
            </li>
            <li>
              <button @click="logout" class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { BellIcon, MoonIcon, SunIcon } from '@heroicons/vue/outline'
import { useNotifications } from '@/composables/useNotifications'

const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()

const user = ref({ name: 'Admin User', role: 'admin' })

const showNotifications = ref(false)
const showDropdown = ref(false)
const theme = ref('light')

const notificationRef = ref(null)
const profileRef = ref(null)

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
}

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

const logout = () => {
  console.log('Logged out')
}

// Click outside
const handleClickOutside = (event) => {
  if (notificationRef.value && !notificationRef.value.contains(event.target)) {
    showNotifications.value = false
  }
  if (profileRef.value && !profileRef.value.contains(event.target)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme.value = 'dark'
  }
  watch(theme, (newTheme) => {
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }, { immediate: true })
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
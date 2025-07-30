<template>
  <div class="space-y-6">
    <!-- Header and Filter -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold" style="color: var(--color-primary-dark)">User Management</h1>

      <!-- Role Filter -->
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium" style="color: var(--color-text-muted)">Filter by role:</label>
        <select
          v-model="selectedRole"
          class="px-3 py-1.5 rounded-md border text-sm"
          style="background-color: var(--color-bg-muted); border-color: var(--color-border); color: var(--color-text)"
        >
          <option value="">All</option>
          <option value="admin">Admin</option>
          <option value="farmer">Farmer</option>
          <option value="driver">Driver</option>
        </select>
      </div>
    </div>

    <!-- Search -->
    <div class="w-full sm:max-w-sm">
      <input
        v-model="search"
        type="text"
        placeholder="Search by name or email"
        class="w-full px-4 py-2 rounded-md border text-sm"
        style="background-color: var(--color-bg-muted); border-color: var(--color-border); color: var(--color-text);"
      />
    </div>

    <!-- Table -->
    <div
      class="overflow-x-auto rounded-lg shadow border"
      style="border-color: var(--color-border); background-color: var(--color-bg);"
    >
      <table class="min-w-full text-sm text-left">
        <thead
          class="text-sm font-semibold"
          style="background-color: var(--color-primary-light); color: var(--color-primary-dark);"
        >
          <tr>
            <th class="px-4 py-3">Name</th>
            <th class="px-4 py-3">Email</th>
            <th class="px-4 py-3">Role</th>
            <th class="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.id"
            class="border-t transition-colors"
            style="border-color: var(--color-border);"
            @mouseover="$event.currentTarget.style.backgroundColor = 'var(--color-bg-muted)'"
            @mouseleave="$event.currentTarget.style.backgroundColor = 'transparent'"
          >
            <td class="px-4 py-3 font-medium">{{ user.name }}</td>
            <td class="px-4 py-3">{{ user.email }}</td>
            <td class="px-4 py-3">
              <span
                :class="[
                  'inline-block px-2 py-0.5 text-xs font-semibold rounded-full',
                  roleBadgeClass(user.role)
                ]"
              >
                {{ capitalize(user.role) }}
              </span>
            </td>
            <td class="px-4 py-3 text-center space-x-2">
              <button
                class="text-sm font-medium text-[var(--color-primary-dark)] hover:underline"
                @click="openModal(user)"
              >
                View
              </button>
              <button
                class="text-sm font-medium text-[var(--color-secondary-dark)] hover:underline"
                @click="impersonate(user)"
              >
                Impersonate
              </button>
              <button
                class="text-sm font-medium text-red-600 hover:underline"
                @click="deactivate(user)"
              >
                Deactivate
              </button>
            </td>
          </tr>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="4" class="text-center px-4 py-6 text-sm" style="color: var(--color-text-muted)">
              No users found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- User Modal -->
    <UserModal v-if="selectedUser" :user="selectedUser" @close="selectedUser = null" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import UserModal from '@/components/admin/UserModal.vue'

const selectedRole = ref('')
const search = ref('')
const selectedUser = ref(null)

const users = ref([
  { id: 1, name: 'Alice Admin', email: 'admin@example.com', role: 'admin' },
  { id: 2, name: 'Farmer John', email: 'john@farm.com', role: 'farmer' },
  { id: 3, name: 'Driver Dan', email: 'dan@drive.com', role: 'driver' },
  { id: 4, name: 'Driver Dave', email: 'dave@move.com', role: 'driver' },
])

const filteredUsers = computed(() =>
  users.value.filter((u) => {
    const matchesRole = selectedRole.value ? u.role === selectedRole.value : true
    const matchesSearch =
      u.name.toLowerCase().includes(search.value.toLowerCase()) ||
      u.email.toLowerCase().includes(search.value.toLowerCase())
    return matchesRole && matchesSearch
  })
)

const roleBadgeClass = (role) => {
  if (role === 'admin') return 'bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]'
  if (role === 'farmer') return 'bg-yellow-100 text-yellow-800'
  return 'bg-[var(--color-secondary-light)] text-[var(--color-secondary-dark)]'
}

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)

const openModal = (user) => {
  selectedUser.value = user
}

const impersonate = (user) => {
  alert(`You are now impersonating ${user.name}.`)
}

const deactivate = (user) => {
  alert(`${user.name} has been deactivated.`)
}
</script>

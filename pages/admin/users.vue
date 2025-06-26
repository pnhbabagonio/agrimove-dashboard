<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Users Management</h1>

    <!-- Filter -->
    <div class="flex items-center gap-4">
      <label class="font-medium">Filter by role:</label>
      <select v-model="selectedRole" class="border px-3 py-1 rounded">
        <option value="">All</option>
        <option value="admin">Admin</option>
        <option value="farmer">Farmer</option>
        <option value="driver">Driver</option>
      </select>
    </div>

    <!-- User Table -->
    <div class="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 dark:bg-gray-700 text-left">
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Role</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id" class="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-4 py-2">{{ user.name }}</td>
            <td class="px-4 py-2">{{ user.email }}</td>
            <td class="px-4 py-2 capitalize">{{ user.role }}</td>
            <td class="px-4 py-2 space-x-2">
              <button class="text-blue-600 hover:underline" @click="openModal(user)">View</button>
              <button class="text-yellow-600 hover:underline">Impersonate</button>
              <button class="text-red-600 hover:underline">Deactivate</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <UserModal v-if="selectedUser" :user="selectedUser" @close="selectedUser = null" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import UserModal from '@/components/admin/UserModal.vue'

const selectedRole = ref('')
const selectedUser = ref(null)

const users = ref([
  { id: 1, name: 'Alice Admin', email: 'admin@example.com', role: 'admin' },
  { id: 2, name: 'Farmer John', email: 'john@farm.com', role: 'farmer', farm_name: 'Green Pastures' },
  { id: 3, name: 'Driver Dan', email: 'dan@drive.com', role: 'driver', vehicle_type: 'Truck' },
])

const filteredUsers = computed(() => {
  return selectedRole.value
    ? users.value.filter(u => u.role === selectedRole.value)
    : users.value
})

const openModal = (user) => {
  selectedUser.value = user
}
</script>

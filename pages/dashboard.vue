<script setup>
const { user } = useAuth()

const router = useRouter()

onMounted(() => {
  if (!user.value) return

  const role = user.value.role

  // Redirect based on role
  if (role === 'driver') {
    router.replace('/admin/dashboard')
  } else if (role === 'farmer') {
    router.replace('/farmer/dashboard')
  } else if (role === 'driver') {
    router.replace('/driver/dashboard')
  } else {
    router.replace('/unauthorized') // or 404
  }
})
</script>

<template>
  <div class="p-6 text-gray-500">Redirecting to your dashboard...</div>
</template>

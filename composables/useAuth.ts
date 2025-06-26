export const useAuth = () => {
  // Simulate user info from auth state
  const user = ref({
    id: 1,
    name: 'Test User',
    role: 'admin', // Change to 'farmer' or 'driver' to test
  })

  return {
    user,
  }
}

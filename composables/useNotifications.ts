// composables/useNotifications.ts
export const useNotifications = () => {
  const notifications = ref([
    {
      id: 1,
      role: 'admin',
      type: 'shipment',
      message: '🚚 Driver assigned to Shipment #112',
      time: '2 min ago',
      read: false,
    },
    {
      id: 2,
      role: 'admin',
      type: 'payment',
      message: '💳 Payment failed for Farmer Jane',
      time: '10 min ago',
      read: false,
    },
    {
      id: 3,
      role: 'admin',
      type: 'review',
      message: '⭐ New review received for Driver Dan',
      time: '1 hour ago',
      read: true,
    },
  ])

  const unreadCount = computed(() => notifications.value.filter((n) => !n.read).length)

  const markAsRead = (index: number) => {
    notifications.value[index].read = true
  }

  const markAllAsRead = () => {
    notifications.value.forEach((n) => (n.read = true))
  }

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  }
}

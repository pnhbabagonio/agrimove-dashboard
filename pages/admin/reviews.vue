<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">User Reviews</h1>

    <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 dark:bg-gray-700 text-left">
          <tr>
            <th class="px-4 py-2">Reviewer</th>
            <th class="px-4 py-2">For</th>
            <th class="px-4 py-2">Rating</th>
            <th class="px-4 py-2">Comment</th>
            <th class="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="review in reviews"
            :key="review.id"
            class="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td class="px-4 py-2">{{ review.reviewer }}</td>
            <td class="px-4 py-2">{{ review.target }}</td>
            <td class="px-4 py-2">
              <span class="text-yellow-400">
                <span v-for="i in review.rating" :key="i">★</span>
                <span v-for="i in 5 - review.rating" :key="'e' + i" class="text-gray-300">★</span>
              </span>
            </td>
            <td class="px-4 py-2">{{ review.comment }}</td>
            <td class="px-4 py-2">{{ review.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const reviews = [
  {
    id: 1,
    reviewer: 'Farmer John',
    target: 'Driver A',
    rating: 5,
    comment: 'Fast and careful with the shipment.',
    date: '2025-06-21',
  },
  {
    id: 2,
    reviewer: 'Farmer Jane',
    target: 'Driver B',
    rating: 4,
    comment: 'On time but forgot to call before arrival.',
    date: '2025-06-22',
  },
]
</script>

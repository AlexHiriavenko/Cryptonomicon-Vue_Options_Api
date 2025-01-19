<template>
  <div class="pagination-controls">
    <button
      :disabled="!hasPrevPage"
      class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      :class="{ 'disabled:opacity-50': !hasPrevPage }"
      @click="$emit('prevPage')"
    >
      Back
    </button>
    <button
      :disabled="!hasNextPage"
      class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      :class="{ 'disabled:opacity-50': !hasNextPage }"
      @click="$emit('nextPage')"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: 'PaginationControls',
  props: {
    hasNextPage: {
      type: Boolean,
      required: true,
    },
    hasPrevPage: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<template>
  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
    <div
      v-for="ticker of paginatedTickers"
      :key="ticker.name"
      :class="[
        selectedTicker === ticker ? 'border-4' : '',
        ticker.price !== null ? 'bg-white' : 'bg-red-100',
      ]"
      class="overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
      @click="$emit('selectTicker', ticker)"
    >
      <div class="px-4 py-5 sm:p-6 text-center">
        <dt class="text-sm font-medium text-gray-500 truncate">
          {{ ticker.name }} - USD
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{
            ticker.price === null
              ? 'нет курса к USD'
              : formatPrice(ticker.price)
          }}
        </dd>
      </div>
      <div class="w-full border-t border-gray-200"></div>
      <button
        class="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
        @click.stop="$emit('removeTicker', ticker)"
      >
        <RemoveIcon />
        Удалить
      </button>
    </div>
  </dl>
</template>

<script>
import RemoveIcon from '@/components/SVG/RemoveIcon.vue';

export default {
  name: 'TickersList',

  components: {
    RemoveIcon,
  },

  props: {
    paginatedTickers: Array,
    selectedTicker: Object,
  },
  emits: ['selectTicker', 'removeTicker'],
  methods: {
    formatPrice(price) {
      if (price === '-') return price;
      return price > 1 ? price?.toFixed(2) : price?.toPrecision(2);
    },
  },
};
</script>

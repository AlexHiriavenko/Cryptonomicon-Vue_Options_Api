<template>
  <section>
    <div class="flex">
      <div class="max-w-xs">
        <label for="wallet" class="block text-sm font-medium text-gray-700"
          >Тикер</label
        >
        <div class="mt-1 relative rounded-md shadow-md">
          <input
            id="wallet"
            v-model="ticker"
            type="text"
            name="wallet"
            class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            placeholder="Например DOGE"
            @keydown.enter="add"
          />
        </div>
      </div>
    </div>
    <add-button type="button" :disabled="disabled" class="my-4" @click="add" />
  </section>
</template>
<script>
import AddButton from './AddButton.vue';

export default {
  components: {
    AddButton,
  },

  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  emits: {
    addTicker: (value) => typeof value === 'string' && value.length > 0,
  },

  data() {
    return { ticker: '' };
  },

  methods: {
    add() {
      if (this.ticker.length === 0) {
        return;
      }
      this.$emit('addTicker', this.ticker);
      this.ticker = '';
    },
  },
};
</script>

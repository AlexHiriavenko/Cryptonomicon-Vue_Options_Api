<template>
  <section v-if="selectedTicker" class="relative">
    <h3 class="text-lg leading-6 font-medium text-gray-900 my-8">
      {{ selectedTicker.name }} - USD
    </h3>
    <div
      ref="graph"
      class="flex items-end border-gray-600 border-b border-l h-64"
    >
      <div
        v-for="(g, idx) of normalizedGraph"
        :key="idx"
        :style="{ height: `${g}%` }"
        class="bg-purple-800 border w-10"
      ></div>
    </div>
    <button
      type="button"
      class="absolute top-0 right-0"
      @click="$emit('removeGraph')"
    >
      <CloseIcon />
    </button>
  </section>
</template>

<script>
import CloseIcon from './SVG/CloseIcon.vue';

export default {
  name: 'TheGraph',

  components: {
    CloseIcon,
  },

  props: {
    selectedTicker: Object,
    graph: Array,
  },

  emits: {
    click: null,
    removeGraph: null,
    updateMaxElements: null,
  },

  data() {
    return {
      maxGraphElements: 1,
      graphWidth: 0,
    };
  },

  computed: {
    normalizedGraph() {
      const maxVal = Math.max(...this.graph);
      let minVal = Math.min(...this.graph);
      if (maxVal === minVal) {
        minVal = 0;
      }
      return this.graph.map((g) => 5 + ((g - minVal) * 95) / (maxVal - minVal));
    },
  },

  watch: {
    maxGraphElements() {
      this.$emit('updateMaxElements', this.maxGraphElements);
    },

    graph() {
      this.calculateMaxGraphElements();
    },

    graphWidth() {
      this.calculateMaxGraphElements();
    },
  },

  mounted() {
    window.addEventListener('resize', this.calculateMaxGraphElements);
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.calculateMaxGraphElements);
  },

  methods: {
    calculateMaxGraphElements() {
      if (!this.$refs.graph) {
        return;
      }
      this.graphWidth = this.$refs.graph.clientWidth;
      this.maxGraphElements = parseFloat((this.graphWidth / 38).toFixed());
    },
  },
};
</script>

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
import CloseIcon from '@/components/SVG/CloseIcon.vue';

export default {
  name: 'TheGraph',

  components: {
    CloseIcon,
  },

  props: {
    selectedTicker: Object,
    graph: Array,
  },
  emits: ['removeGraph'],
  data() {
    return {
      maxGraphElements: 1,
      graphWidth: 0,
      localGraph: [],
    };
  },
  computed: {
    normalizedGraph() {
      const maxVal = Math.max(...this.localGraph);
      let minVal = Math.min(...this.localGraph);
      if (maxVal === minVal) {
        minVal = 0;
      }
      return this.localGraph.map(
        (g) => 5 + ((g - minVal) * 95) / (maxVal - minVal)
      );
    },
  },
  watch: {
    graph: {
      immediate: true,
      handler(newGraph) {
        this.localGraph = this.resizeGraph(newGraph);
      },
    },
    graphWidth() {
      this.calculateMaxGraphElements();
    },
  },
  mounted() {
    window.addEventListener('resize', this.calculateMaxGraphElements);
    this.calculateMaxGraphElements();
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
      this.maxGraphElements = Math.floor(this.graphWidth / 38);
    },
    resizeGraph(graph) {
      if (graph.length > this.maxGraphElements) {
        return graph.slice(graph.length - this.maxGraphElements);
      }
      return graph;
    },
  },
};
</script>

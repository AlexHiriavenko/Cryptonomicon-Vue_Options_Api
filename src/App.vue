<template>
  <TopCoinList />
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div class="container">
      <AddTicker
        :often-tickers="oftenTickers"
        :tickers="tickers"
        @add-ticker="add"
      />
      <template v-if="tickers.length">
        <div>
          <PaginationControls
            :has-prev-page="hasPrevPage"
            :has-next-page="hasNextPage"
            @prev-page="hasPrevPage && page--"
            @next-page="hasNextPage && page++"
          />
          <label for="filter" class="block text-sm font-medium text-gray-700"
            >Фильтр</label
          >
          <input
            id="filter"
            v-model="filter"
            type="text"
            class="block pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            @keydown.enter="add"
          />
        </div>
        <hr class="w-full border-t border-gray-600 my-4" />
        <TickersList
          :paginatedTickers="paginatedTickers"
          @selectTicker="select"
          @removeTicker="remove"
        />
        <hr class="w-full border-t border-gray-600 my-4" />
        <TheGraph
          :graph="graph"
          :selected-ticker="selectedTicker"
          @remove-graph="selectedTicker = null"
          @update-max-elements="updateMaxElements"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { getTickerList, subscribeToTicker, unsubscribeFromTicker } from './api';
import AddTicker from './components/AddTicker.vue';
import PaginationControls from './components/PaginationControls.vue';
import TheGraph from './components/TheGraph.vue';
import TickersList from '@/components/TickersList.vue';
import TopCoinList from './components/TopCoinList.vue';

const PER_PAGE = 6;

export default {
  components: {
    TopCoinList,
    AddTicker,
    TheGraph,
    PaginationControls,
    TickersList,
  },

  data() {
    return {
      oftenTickers: [],
      selectedTicker: null,
      tickers: [],
      graph: [],
      filter: '',
      page: 1,
      maxGraphElements: 1,
    };
  },

  computed: {
    pageStateOptions() {
      return {
        filter: this.filter,
        page: this.page,
      };
    },

    startIndex() {
      return PER_PAGE * (this.page - 1);
    },

    endIndex() {
      return PER_PAGE * this.page;
    },

    hasNextPage() {
      return this.filteredTickers?.length > this.endIndex;
    },

    hasPrevPage() {
      return this.page > 1;
    },

    filteredTickers() {
      return this.tickers?.filter((t) => {
        return t.name?.includes(this.filter?.toUpperCase());
      });
    },

    paginatedTickers() {
      return this.filteredTickers?.slice(this.startIndex, this.endIndex);
    },
  },

  watch: {
    tickers() {
      localStorage.setItem('cryptonomicon', JSON.stringify(this.tickers));
    },

    paginatedTickers() {
      if (!this.paginatedTickers?.length && this.page > 1) {
        this.page -= 1;
      }
    },

    selectedTicker() {
      this.graph = [];
      this.$nextTick(this.calculateMaxGraphElements);
    },

    filter() {
      this.page = 1;
    },

    pageStateOptions(state) {
      window.history.pushState(
        null,
        '',
        `${window.location.pathname}?filter=${state.filter}&page=${state.page}`
      );
    },
  },

  async created() {
    this.oftenTickers = [...(await getTickerList())];

    const params = Object.fromEntries(
      new URL(window.location).searchParams.entries()
    );
    const VALID_KEYS = ['filter', 'page'];
    VALID_KEYS.forEach((key) => {
      if (params[key]) {
        this[key] = params[key];
      }
    });

    const tickers = localStorage.getItem('cryptonomicon');
    if (tickers) {
      this.tickers = JSON.parse(tickers);
      this.tickers?.forEach((ticker) => {
        subscribeToTicker(ticker.name, (price) => {
          this.updateTicker(ticker.name, price);
        });
      });
    }
  },

  methods: {
    add(ticker) {
      if (!ticker) {
        return;
      }
      this.tickers = [...this.tickers, ticker];
      subscribeToTicker(ticker.name, (price) => {
        this.updateTicker(ticker.name, price);
      });
      this.ticker = '';
    },

    resizeGraph() {
      if (this.graph.length > this.maxGraphElements) {
        this.graph = this.graph.slice(
          this.graph.length - this.maxGraphElements,
          this.graph.length
        );
      }
    },

    updateMaxElements(maxElements) {
      this.maxGraphElements = maxElements;
      this.resizeGraph();
    },

    updateTicker(tickerName, price) {
      this.tickers.find((t) => t.name === tickerName).price = price;
      if (this.selectedTicker?.name === tickerName) {
        this.graph = [...this.graph, price];
        this.resizeGraph();
      }
    },

    remove(tickerToRemove) {
      this.tickers = this.tickers.filter((ticker) => {
        if (ticker === tickerToRemove) {
          clearInterval(ticker.intervalId);
          ticker.intervalId = null;
        }
        return ticker !== tickerToRemove;
      });
      if (tickerToRemove === this.selectedTicker) {
        this.selectedTicker = null;
      }
      unsubscribeFromTicker(tickerToRemove.name);
    },

    select(ticker) {
      this.selectedTicker = ticker;
    },
  },
};
</script>

<template>
  <h2 class="py-4 px-4">Популярные:</h2>
  <ul class="flex flex-wrap gap-4 py-4 px-4">
    <li
      v-for="{ CoinInfo } in topCoinList"
      :key="CoinInfo.Name"
      class="bg-black p-2 text-green-400"
    >
      {{ CoinInfo.Name }} : {{ CoinInfo.FullName }}
    </li>
  </ul>
</template>

<script>
import { getCoinTopList } from '@/api';

export default {
  name: 'TopCoinList',

  data() {
    return {
      topCoinList: [],
    };
  },

  async created() {
    this.topCoinList = await getCoinTopList();
  },
};
</script>

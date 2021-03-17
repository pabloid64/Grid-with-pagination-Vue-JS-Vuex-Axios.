<template>
  <main class="container mt-md-5">

    <!-- Loading spinner -->
    <div v-if="isLoading" class="spinner-border" />

    <template v-else>
      <div v-if="isCached" class="alert alert-success text-start">
        <h4 class="alert-heading">Data was cached!</h4>
        <p>You can clear cache and load data again.</p>
        <hr/>
        <button @click= "clearCache" class="btn btn-sm btn-primary mr-auto">
          Clear cache
        </button>
      </div>

      <data-table
        :rows="tableData"
        :columns="columns"
      />
    </template>
  </main>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {

  name: 'AppContent',

  data: () => ({
    columns: [
      {
        label: 'ID',
        prop: 'id',
        width: '15%',
      },
      {
        label: 'Date',
        prop: 'date',
        width: '20%',
      },
      {
        label: 'Name',
        prop: 'name',
        width: '30%',
      },
      {
        label: 'Amount',
        prop: 'amount',
        width: '35%',
      },
      {
        label: 'Year',
        prop: 'year',
        width: '10%',
      },
    ],
  }),

  computed: {
    ...mapState([
      'isLoading',
      'isCached',
      'data',
    ]),
    tableData() {
      let res;
      if (this.isCached) {
        res = JSON.parse(localStorage.getItem('data'));
      } else {
        res = this.data;
      }
      return res;
    },
  },

  created() {
    if (localStorage.getItem('data')) {
      this.set({ isCached: true });
    } else {
      this.load();
    }
  },

  methods: {
    ...mapMutations([
      'set',
    ]),
    ...mapActions([
      'load',
    ]),
    clearCache() {
      this.set({ isCached: false });
      this.load();
    },
  },
};
</script>

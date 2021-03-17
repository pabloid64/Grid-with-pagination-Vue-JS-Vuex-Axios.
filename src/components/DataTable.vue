<template>
  <div class="data-table">
    <template v-if= "!tableType">
      <table class="table">
        <thead>
            <th class="table-th" v-for= "item in columns" :key= "item.id" :style= "setWidth(item.width)">{{item.label}}</th>
        </thead>
        <tbody>
            <tr v-for= "item in paginateRows" :key= "item.id">
              <td class="table-td" v-for= "items in columns" :key= "items.id">{{ item[items.prop] }}</td>
            </tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <ul class="list" v-for= "item in paginateRows" :key= "item.id">
        <div v-for= "items in columns" :key= "items.id">
          <li class="thead">{{items.label}}</li>
          <li class="tbody">{{ item[items.prop] }}</li>
        </div>
      </ul>
    </template>
    <div class="data-table__paginator">
      <data-paginator v-model="page" :pages="pageCount" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    tableType: false,
    page: 1,
    pageSize: 4,
  }),

  created() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  computed: {
    pageCount() {
      return Math.ceil(this.rows.length / this.pageSize);
    },
    paginateRows() {
      const from = (this.page - 1) * this.pageSize;
      const to = from + this.pageSize;
      return this.rows.slice(from, to).map((item) => {
        item.amount = item.amount.toLocaleString('ru').replace(/,/, '.');
        item.date = item.date.toString().split('-').reverse().join('.');
        return item;
      });
    },
  },
  methods: {
    onResize() {
      this.tableType = window.innerWidth <= 768;
    },
    setWidth(width) {
      return `width:${width}`;
    },
  },
};
</script>

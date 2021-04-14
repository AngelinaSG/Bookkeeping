<template>
  <div>
    <div class="page-title">
      <h3>{{ "History_Title" | localize }}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      {{ "NoRecords" | localize }}.
      <router-link to="/record">{{ "AddFirst" | localize }}</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :clickHandler="pageChangeHandler"
        :container-class="'pagination'"
        :active-class="'active teal lighten-2'"
        :page-class="'waves-effect'"
        :prev-text="'Back' | localize"
        :next-text="'Forward' | localize"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from "@/mixins/pagination.mixin";
import { Pie } from "vue-chartjs";
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "history",
  metaInfo() {
    return { title: this.$title("History_Title") };
  },
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.setup(categories);

    this.loading = false;
  },
  components: {
    HistoryTable,
  },
  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map((record) => {
          return {
            ...record,
            categoryName: categories.find((c) => c.id === record.categoryId)
              .title,
            typeClass: record.type === "income" ? "green" : "red",
            typeText:
              record.type === "income"
                ? localizeFilter("Income")
                : localizeFilter("Outcome"),
          };
        })
      );

      this.renderChart({
        labels: categories.map((c) => c.title),
        datasets: [
          {
            label: "Расходы по категориям",
            data: categories.map((c) => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === "outcome") {
                  total += +r.amount;
                }
                return total;
              }, 0);
            }),
            backgroundColor: [
              "rgba(248, 187, 208, 0.8)",
              "rgba(38, 166, 154, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(248, 187, 208, 1)",
              "rgba(38, 166, 154, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.pagination li.active a {
  background-color: teal lighten-2;
}

::v-deep .pagination li a {
  outline: none;
}
</style>

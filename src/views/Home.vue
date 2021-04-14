<template>
  <div>
    <div class="page-title">
      <h3>{{ "Bill" | localize }}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div class="row" v-else>
      <HomeBill :rates="rates" />
      <HomeCurrency :rates="rates" :date="date" />
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";

export default {
  name: "home",
  metaInfo() {
    return { title: this.$title("Bill") };
  },
  data: () => ({
    loading: true,
    currency: null,
    rates: null,
    date: null,
  }),
  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.rates = this.currency["conversion_rates"];
    this.date = this.currency["time_last_update_utc"];
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchCurrency");
      this.loading = false;
    },
  },
  components: {
    HomeBill,
    HomeCurrency,
  },
};
</script>

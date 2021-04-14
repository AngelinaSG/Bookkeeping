<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ "CRM_Title" | localize }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email),
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
          >{{ "Message_EmailRequired" | localize }}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
          >{{ "Message_EmailValid" | localize }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength),
          }"
        />
        <label for="password">{{ "Password" | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
          >{{ "Message_EnterPassword" | localize }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          {{ "Message_MinLength" | localize }}
          {{ $v.password.$params.minLength.min }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <div v-if="loading" class="progress">
          <div class="indeterminate"></div>
        </div>
        <button
          v-else
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          <template>{{ "Login" | localize }}</template>
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ "NoAccount" | localize }}
        <router-link to="/register" class="pink-text text-lighten-2">
          {{ "Register" | localize }}</router-link
        >
      </p>
    </div>
  </form>
</template>


<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import messages from "@/utils/messages";
import localizeFilter from "@/filters/localize.filter";
import Loader from "../components/app/Loader.vue";

export default {
  components: { Loader },
  name: "login",
  metaInfo() {
    return { title: this.$title("Login") };
  },
  data: () => ({
    email: "",
    password: "",
    loading: false,
  }),

  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },

  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
      };

      try {
        this.loading = true;
        await this.$store.dispatch("login", formData);
        this.$router.push("/");
      } catch (e) {}
    },
  },
};
</script>

<style scoped>
.button-loader {
  margin: auto;
  display: flex;
  align-content: flex-start;
}
</style>
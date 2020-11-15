<script>
import appConfig from "@/app.config";
import { mapGetters, mapActions } from 'vuex';
import { notificationMethods } from "@/state/helpers";

export default {
  name: "app",
  computed: {
    ...mapGetters(['isSignedIn', 'getToken'])
  },
  beforeMount() {
    this.autoLogin();
  },
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    }
  },
  mounted() {},
  watch: {
    /**
     * Clear the alert message on route change
     */
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      // clear alert on location change
      this.clearNotification();
    }
  },
  methods: {
    ...mapActions(['autoLogin']),
    clearNotification: notificationMethods.clear
  }
};
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

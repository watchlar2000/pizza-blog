<template>
  <div>
    <articles-list />
  </div>
</template>

<script>
import ArticlesList from "@/components/ArticlesList.vue";
import { useUserStore } from "@/store/user";
import { mapActions } from "pinia";

export default {
  name: "HomeView",
  components: {
    ArticlesList,
  },
  mounted() {
    this.getCurrentUser();
  },
  methods: {
    ...mapActions(useUserStore, ["getCurrentUser"]),
  },
};
</script>

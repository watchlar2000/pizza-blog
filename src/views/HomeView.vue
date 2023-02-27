<template>
  <div>
    <articles-list />
  </div>
</template>

<script>
import ArticlesList from "@/components/ArticlesList.vue";

export default {
  name: "HomeView",
  components: {
    ArticlesList,
  },
};
</script>

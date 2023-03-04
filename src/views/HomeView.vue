<template>
  <div>
    <posts-list />
  </div>
</template>

<script>
import PostsList from "@/components/PostsList.vue";

export default {
  name: "HomeView",
  components: {
    PostsList,
  },
};
</script>

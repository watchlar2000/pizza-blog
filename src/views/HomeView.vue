<template>
  <div>
    <posts-list v-if="!loading" />
    <loader-item v-show="loading" />
  </div>
</template>

<script>
import LoaderItem from "@/components/LoaderItem.vue";
import PostsList from "@/components/PostsList.vue";
// import { usePostStore } from "@/store/post";
import { useUiStore } from "@/store/ui";
import { mapState } from "pinia";

export default {
  name: "HomeView",
  components: {
    PostsList,
    LoaderItem,
  },
  computed: {
    // ...mapState(usePostStore, ["loading"]),
    ...mapState(useUiStore, ["loading"]),
  },
};
</script>

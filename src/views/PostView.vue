<template>
  <div class="post" v-if="currentPost">
    <span class="button-back" @click="goBack">Go back</span>
    <h2 class="title">{{ currentPost.title }}</h2>
    <p class="date">Published: {{ formatDate(currentPost.created_at) }}</p>
    <div v-html="currentPost.content" class="content" />
  </div>
</template>

<script>
import { usePostStore } from "@/store/post";
import { formatDate } from "@/utils/helpers";
import { mapActions, mapState } from "pinia";

export default {
  name: "PostView",
  mounted() {
    const postId = this.$route.params.id;
    this.getPost(postId);
  },
  computed: {
    ...mapState(usePostStore, ["currentPost"]),
  },
  methods: {
    ...mapActions(usePostStore, ["getPost", "getPostsList"]),
    formatDate,
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  color: #2a2a2a;
  font-family: "Poppins";
  font-weight: 600;
  font-size: 24px;
}

.content {
  font-size: 18px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.button-back {
  color: var(--surface);
  width: max-content;
  position: relative;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    bottom: 1px;
    left: 0;
    height: 2px;
    width: 100%;
    background: var(--surface);
    transition: all 0.05s ease-in-out;
    opacity: 0;
  }

  &:hover::after {
    opacity: 1;
  }
}

.title {
  &:hover::after {
    opacity: 0;
  }
}
</style>

<template>
  <div>
    <div class="post" v-if="currentPost">
      <span class="button-back" @click="goBack">Go back</span>
      <h2 class="title">{{ currentPost.title }}</h2>
      <p class="date">Published: {{ formatDate(currentPost.createdAt) }}</p>
      <div v-html="currentPost.content" class="content" />
    </div>
    <div>Comments: {{ comments?.length }}</div>
    <comments-list />
  </div>
</template>

<script>
import CommentsList from "@/components/CommentsList.vue";
import { useCommentStore } from "@/store/comment";
import { usePostStore } from "@/store/post";
import { formatDate } from "@/utils/helpers";
import { mapActions, mapState } from "pinia";

export default {
  name: "PostView",
  components: {
    CommentsList,
  },
  mounted() {
    this.loadPostData();
  },
  computed: {
    ...mapState(usePostStore, ["currentPost"]),
    ...mapState(useCommentStore, ["comments"]),
  },
  methods: {
    ...mapActions(usePostStore, ["getPostById"]),
    ...mapActions(useCommentStore, ["getCommentsListByPostId"]),
    formatDate,
    goBack() {
      this.$router.go(-1);
    },
    loadPostData() {
      const postId = this.$route.params.id;
      this.getPostById(postId);
      this.getCommentsListByPostId(postId);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-family: "Poppins";
  font-weight: 600;
  font-size: 24px;

  &:hover {
    color: var(--primary) !important;
  }
}

.content {
  font-size: 18px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.button-back {
  color: var(--primary);
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
    background: var(--primary);
    transition: all 0.05s ease-in-out;
    opacity: 0;
  }

  &:hover::after {
    opacity: 1;
  }
}
</style>

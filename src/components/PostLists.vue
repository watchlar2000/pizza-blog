<template>
  <div>
    <div v-if="posts.length !== 0">
      <div v-for="(post, idx) in posts" :key="idx" class="post">
        <router-link
          :to="{ name: 'Post', params: { id: post.id } }"
          class="title"
          >{{ post.title }}</router-link
        >
        <p class="subtitle">{{ post.subtitle }}</p>
        <p class="date">Published: {{ formatDate(post.created_at) }}</p>
      </div>
    </div>
    <h2 v-else>No posts yet...</h2>
  </div>
</template>

<script>
import { usePostStore } from "@/store/post";
import { formatDate } from "@/utils/helpers";
import { mapState } from "pinia";

export default {
  name: "PostLists",
  computed: {
    ...mapState(usePostStore, ["posts"]),
  },
  methods: {
    formatDate,
  },
};
</script>

<style lang="scss">
.post {
  margin-bottom: 36px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.title {
  color: #2a2a2a;
  font-family: "Poppins";
  font-weight: 600;
  font-size: 24px;

  &:hover {
    color: #2a2a2ada;
  }
}

.subtitle {
  font-size: 18px;
}

.date {
  font-size: 12px;
  margin-top: 4px !important;
  font-weight: 600;
}
</style>

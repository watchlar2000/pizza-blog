<template>
  <div>
    <div v-if="getSortedPostsList.length !== 0">
      <div v-for="(post, idx) in getSortedPostsList" :key="idx" class="post">
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
  name: "PostsList",
  computed: {
    ...mapState(usePostStore, ["getSortedPostsList"]),
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
  font-family: "Poppins";
  font-weight: 600;
  font-size: 24px;
  position: relative;
  transition: all 0.05s ease-in-out;
  color: var(--primary);

  &:hover {
    color: var(--surface) !important;
  }
}

.button-back {
  color: var(--surface);
  width: max-content;
  cursor: pointer;
}

.subtitle {
  font-size: 18px;
}

.date {
  font-family: "Poppins";
  color: var(--primary);
  font-size: 12px;
  font-weight: 100;
}
</style>

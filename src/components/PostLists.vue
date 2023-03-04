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
  name: "PostLists",
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
  width: max-content;
  color: #2a2a2a;
  font-family: "Poppins";
  font-weight: 600;
  font-size: 24px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -3px;
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

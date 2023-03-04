<template>
  <div>
    <div class="comment-input">
      <h3 class="subtitle">Leave a comment:</h3>
      <quill-editor
        class="editor"
        @change="onEditorChange"
        :value="content"
        :options="editorOption"
      />
      <button class="button-post">Add comment</button>
    </div>

    <div class="list">
      <div class="comment">
        <div class="user">J</div>
        <div class="comment-data">
          <div class="title">
            <h3 class="user-name">John</h3>
            <span class="date">{{ formatDate(new Date()) }}</span>
          </div>
          <p class="comment-content">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam
            blanditiis dolores adipisci minus quam, dignissimos a odio provident
            illo odit!
          </p>
        </div>
      </div>
      <div class="comment">
        <div class="user">J</div>
        <div class="comment-data">
          <div class="title">
            <h3 class="user-name">John</h3>
            <span class="date">{{ formatDate(new Date()) }}</span>
          </div>
          <p class="comment-content">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam
            blanditiis dolores adipisci minus quam, dignissimos a odio provident
            illo odit!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/helpers";

export default {
  name: "CommentsList",
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["link"],
          ],
        },
      },
    };
  },
  methods: {
    formatDate,
    onEditorChange(value) {
      this.content = value.html;
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.comment {
  display: flex;
  gap: 14px;

  .user {
    flex: 0 0 auto;
    font-size: 18px;
    color: var(--secondary);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--surface);
  }
}

.comment-data {
  .title {
    display: flex;
    align-items: baseline;
    gap: 12px;
  }
}

.user-name {
  font-size: 18px;
  font-family: "Lora";
  font-weight: 600;
}

.comment-input {
  .subtitle {
    font-size: 700;
    color: var(--primary-transparent-50);
  }
}
</style>

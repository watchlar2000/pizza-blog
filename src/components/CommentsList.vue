<template>
  <div class="comments">
    <div class="comment-input">
      <div v-if="isLoggedIn">
        <div class="label" @click="toggleCommentInput">
          <span>Leave a comment</span>
          <a-icon
            type="caret-right"
            class="arrow"
            :class="{
              turned: isCommentInput,
            }"
          />
        </div>
        <div
          v-if="isCommentInput"
          class="popup"
          :class="{
            loading: loading,
          }"
        >
          <quill-editor
            class="editor"
            @change="onEditorChange"
            :value="content"
            :options="editorOption"
          />
          <!-- <button class="button" @click="add"> 123</button> -->
          <button-item @click.native="add">Add comment</button-item>
        </div>
      </div>
      <not-loggedin-msg v-else msg="leave a comment" />
    </div>
    <div class="list" v-if="comments">
      <div class="comment" v-for="c in comments" :key="c.id">
        <router-link :to="{ name: 'Profile', params: { id: c.userId } }">
          <span class="profile" v-if="c.user.photoURL !== ''">
            <img :src="c.user.photoURL" :alt="c.user.name" />
          </span>
          <span class="profile" v-else>{{ c.user.name[0] }}</span>
        </router-link>

        <div class="comment-data">
          <div class="title">
            <h3 class="user-name">{{ c.user.name }}</h3>
            <span class="date">{{ formatDate(c.createdAt) }}</span>
          </div>
          <p class="comment-content" v-html="c.content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonItem from "@/components/ButtonItem.vue";
import NotLoggedinMsg from "@/components/NotLoggedinMsg.vue";
import { useCommentStore } from "@/store/comment";
import { useUiStore } from "@/store/ui";
import { useUserStore } from "@/store/user";
import { formatDate } from "@/utils/helpers";
import { mapActions, mapState } from "pinia";

export default {
  name: "CommentsList",
  components: {
    NotLoggedinMsg,
    ButtonItem,
  },
  data() {
    return {
      isCommentInput: false,
      content: "",
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
  computed: {
    ...mapState(useUserStore, ["isLoggedIn"]),
    ...mapState(useUiStore, ["loading"]),
    ...mapState(useCommentStore, ["comments"]),
  },
  methods: {
    ...mapActions(useCommentStore, ["createComment"]),
    formatDate,
    add() {
      const postId = this.$route.params.id;
      const comment = {
        postId,
        content: this.content,
      };
      this.createComment(comment);
      this.content = "";
    },
    onEditorChange(value) {
      this.content = value.html;
    },
    toggleCommentInput() {
      this.isCommentInput = !this.isCommentInput;
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

.comments {
  margin-top: 12px;
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
  .label {
    width: max-content;
    color: var(--secondary-variant);
    background: var(--primary);
    padding: 4px 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 700;
    transition: all 0.05s ease-in-out;

    &:hover {
      color: var(--secondary);
    }
  }

  .arrow {
    transition: 0.2s ease;
  }
  .turned {
    transform: rotate(90deg);
  }

  .popup {
    margin-top: 12px;
  }
}
</style>

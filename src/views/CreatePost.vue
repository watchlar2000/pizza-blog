<template>
  <div>
    <div v-if="isLoggedIn" class="create-post">
      <div>
        <p v-if="error && this.title === ''" class="error">
          Please write down the title
        </p>
        <input
          type="text"
          v-model="title"
          placeholder="Post title"
          class="input"
        />
      </div>
      <div>
        <p v-if="error && this.subtitle === ''" class="error">
          Please write down a short subtitle
        </p>
        <input
          type="text"
          v-model="subtitle"
          placeholder="Post subtitle"
          class="input"
        />
      </div>

      <div>
        <p v-if="error && this.content === ''" class="error">
          Please fill in the content
        </p>
        <quill-editor
          class="editor"
          @change="onEditorChange"
          :value="content"
          :options="editorOption"
        />
      </div>

      <button @click="addPost" class="button">Publish post</button>
    </div>
    <div v-else>
      <h2 class="text">You should be logged in to be able to create posts.</h2>
      <p class="login">
        <span @click="login" class="login-link">Click here</span> to login.
      </p>
    </div>
  </div>
</template>

<script>
import { usePostStore } from "@/store/post";
import { useUserStore } from "@/store/user";
import { mapActions, mapState } from "pinia";
import { quillEditor } from "vue-quill-editor";

export default {
  name: "CreatePost",
  components: {
    quillEditor,
  },
  data() {
    return {
      title: "",
      subtitle: "",
      content: "",
      error: false,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ align: [] }],
            ["link", "image"],
          ],
        },
      },
    };
  },
  computed: {
    ...mapState(useUserStore, ["isLoggedIn"]),
  },
  methods: {
    ...mapActions(useUserStore, ["login"]),
    ...mapActions(usePostStore, ["createPost"]),
    onEditorChange(value) {
      this.content = value.html;
    },
    validate() {
      console.log("checking...");
      if (this.title !== "" && this.subtitle !== "" && this.content !== "") {
        this.error = false;
      } else {
        this.error = true;
      }
    },
    addPost() {
      this.validate();
      alert("error");
      if (!this.error) {
        const post = {
          title: this.title,
          subtitle: this.subtitle,
          content: this.content,
        };
        this.createPost(post);
        this.reset();
      }
    },
    reset() {
      this.title = "";
      this.subtitle = "";
      this.content = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.create-post {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.button {
  margin-top: 12px;
  padding: 8px 16px;
  font-weight: 400;
  background: var(--primary-transparent-50);
  color: var(--secondary-variant);
  width: max-content;
  margin-inline: auto;
  transition: all 0.05s ease-in-out;

  &:hover {
    background: var(--primary);
  }
}

.input {
  width: 100%;
}

.login {
  font-size: 16px;
  margin-top: 12px !important;
}
.login-link {
  text-decoration: underline;
  cursor: pointer;
}
</style>

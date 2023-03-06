<template>
  <div class="create-post">
    <not-loggedin-msg v-if="!isLoggedIn" msg="create a post" />
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

    <button @click="addPost" class="button button-post">Publish post</button>
  </div>
</template>

<script>
import NotLoggedinMsg from "@/components/NotLoggedinMsg.vue";
import { usePostStore } from "@/store/post";
import { useUserStore } from "@/store/user";
import { mapActions, mapState } from "pinia";
import { quillEditor } from "vue-quill-editor";

export default {
  name: "CreatePost",
  components: {
    quillEditor,
    NotLoggedinMsg,
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

.input {
  width: 100%;
}
</style>

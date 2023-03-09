<template>
  <div>
    <div
      class="create-post"
      :class="{
        loading: loading,
      }"
    >
      <not-loggedin-msg v-if="!isLoggedIn" msg="create a post" />
      <div>
        <input-error-msg v-if="error && this.title === ''"
          >Title required</input-error-msg
        >
        <input-item v-model="title" placeholder="Post title" />
      </div>
      <div>
        <input-error-msg v-if="error && this.subtitle === ''"
          >Subtitle required</input-error-msg
        >
        <input-item v-model="subtitle" placeholder="Post subtitle" />
      </div>
      <div>
        <input-error-msg v-if="error && this.content === ''"
          >Content required</input-error-msg
        >
        <quill-editor
          class="editor"
          @change="onEditorChange"
          :value="content"
          :options="editorOption"
        />
      </div>
    </div>
    <button-item @click.native="addPost">Publish post</button-item>
    <loader-item v-show="loading" />
  </div>
</template>

<script>
import ButtonItem from "@/components/ButtonItem.vue";
import InputErrorMsg from "@/components/InputErrorMsg.vue";
import InputItem from "@/components/InputItem.vue";
import LoaderItem from "@/components/LoaderItem.vue";
import NotLoggedinMsg from "@/components/NotLoggedinMsg.vue";
import { usePostStore } from "@/store/post";
import { useUiStore } from "@/store/ui";
import { useUserStore } from "@/store/user";
import { mapActions, mapState } from "pinia";
import { quillEditor } from "vue-quill-editor";

export default {
  name: "CreatePost",
  components: {
    quillEditor,
    NotLoggedinMsg,
    LoaderItem,
    InputErrorMsg,
    InputItem,
    ButtonItem,
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
    ...mapState(useUiStore, ["loading"]),
  },
  methods: {
    ...mapActions(useUserStore, ["login"]),
    ...mapActions(usePostStore, ["createPost"]),
    onEditorChange(value) {
      this.content = value.html;
    },
    validate() {
      if (this.title !== "" && this.subtitle !== "" && this.content !== "") {
        this.error = false;
      } else {
        this.error = true;
      }
    },
    addPost() {
      this.validate();
      if (!this.error) {
        const post = {
          title: this.title,
          subtitle: this.subtitle,
          content: this.content,
        };
        this.createPost(post);
        this.reset();
        // this.$router.push({ name: "Home" });
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
</style>

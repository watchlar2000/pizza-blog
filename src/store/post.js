import { db } from "@/firebase/firebaseInit";
import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [],
    currentPost: null,
  }),

  actions: {
    async createPost(post) {
      const userData = useUserStore();
      const { id: author_id } = userData;
      const { name: author_name } = userData.user;
      const newPost = {
        ...post,
        author_id,
        author_name,
        created_at: Date.now(),
      };
      try {
        await addDoc(collection(db, "posts"), newPost);
        this.posts.push(newPost);
      } catch (e) {
        console.log(e);
      }
    },
    async getPostsList() {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      this.posts = posts;
    },
    async getPost(id) {
      if (this.posts.length === 0) {
        await this.getPostsList();
      }
      this.currentPost = this.posts.find((p) => p.id === id);
    },
    getPostsByAuthor(userId) {
      return this.posts.filter((p) => p.author_id === userId);
    },
  },

  getters: {
    getSortedPostsList() {
      return this.posts.sort((a, b) => b.created_at - a.created_at);
    },
  },
});

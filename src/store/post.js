import { db } from "@/firebase/firebaseInit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { useUiStore } from "./ui";
import { useUserStore } from "./user";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [],
    currentPost: null,
  }),

  actions: {
    async createPost(post) {
      const ui = useUiStore();
      ui.loading = true;
      const userData = useUserStore();
      const { id: userId } = userData;
      const userDocRef = doc(db, "users", userId);
      const newPost = {
        ...post,
        userId,
        user: userDocRef,
        createdAt: Date.now(),
      };

      try {
        const postRef = await addDoc(collection(db, "posts"), newPost);
        this.posts.unshift({ id: postRef.id, ...newPost });
        ui.loading = false;
      } catch (e) {
        console.log(e);
      }
    },
    async getPostsList() {
      const ui = useUiStore();
      ui.loading = true;
      const postsRef = collection(db, "posts");
      const q = query(postsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      this.posts = await Promise.all(
        querySnapshot.docs.map(async (post) => {
          const postData = { id: post.id, ...post.data() };

          const userSnap = await getDoc(postData.user);
          const userData = userSnap.data();

          return { ...postData, user: { ...userData } };
          // eslint-disable-next-line prettier/prettier
        }),
      );
      ui.loading = false;
    },
    getPostsByAuthor(userId) {
      return this.posts.filter((p) => p.author_id === userId);
    },
    async getPostById(postId) {
      if (this.posts.length === 0) {
        await this.getPostsList();
      }
      this.currentPost = this.posts.find((p) => p.id === postId);
    },
  },
});

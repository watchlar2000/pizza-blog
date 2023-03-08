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
import { useUserStore } from "./user";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [],
    currentPost: null,
  }),

  actions: {
    async createPost(post) {
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
        await addDoc(collection(db, "posts"), newPost);
        this.posts.push(newPost);
      } catch (e) {
        console.log(e);
      }
    },
    async getPostsList() {
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
    },
    async getPostById(postId) {
      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        const postData = postSnap.data();
        const userSnap = await getDoc(postData.user);
        const userData = userSnap.data();

        this.currentPost = { ...postData, user: { ...userData } };
      } else {
        console.log("No such document!");
      }
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

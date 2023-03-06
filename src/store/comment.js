import { db } from "@/firebase/firebaseInit";
import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { usePostStore } from "./post";
import { useUserStore } from "./user";

export const useCommentStore = defineStore("comment", {
  state: () => ({
    comments: [],
  }),

  actions: {
    async createComment(comment) {
      const userData = useUserStore();
      const { id: author_id } = userData;
      const { name: author_name, photoURL: author_photo } = userData.user;

      const newComment = {
        ...comment,
        author_id,
        author_name,
        author_photo,
        created_at: Date.now(),
      };

      try {
        await addDoc(collection(db, "comments"), newComment);
        this.comments.push(newComment);
      } catch (e) {
        console.log(e);
      }
    },
    async getCommentsList() {
      const querySnapshot = await getDocs(collection(db, "comments"));
      const comments = [];
      querySnapshot.forEach((doc) => {
        comments.push({ id: doc.id, ...doc.data() });
      });
      this.comments = comments;
    },
    getCommentsByAuthor(userId) {
      return this.comments.filter((c) => c.author_id === userId);
    },
  },

  getters: {
    getCommentsByPost() {
      const postData = usePostStore().currentPost;

      if (postData === null) {
        return;
      }

      const { id: postId } = postData;
      return this.comments
        .filter((c) => c.post_id === postId)
        .sort((a, b) => b.created_at - a.created_at);
    },
  },
});

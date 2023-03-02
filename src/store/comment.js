import { db } from "@/firebase/firebaseInit";
import { collection, getDocs } from "firebase/firestore/lite";
import { defineStore } from "pinia";

export const useCommentStore = defineStore("comment", {
  state: () => ({
    comments: [],
  }),

  actions: {
    async createComment(comment) {
      console.log(comment);
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
    getSortedCommentsList() {
      return this.comments.sort((a, b) => b.created_at - a.created_at);
    },
  },
});

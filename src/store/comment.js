import { db } from "@/firebase/firebaseInit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useCommentStore = defineStore("comment", {
  state: () => ({
    comments: [],
  }),

  actions: {
    async createComment(comment) {
      const userData = useUserStore();
      const { id: userId, user } = userData;
      const userDocRef = doc(db, "users", userId);
      const newComment = {
        ...comment,
        userId,
        user: userDocRef,
        createdAt: Date.now(),
      };

      try {
        await addDoc(collection(db, "comments"), newComment);
        this.comments.push({ ...newComment, user });
      } catch (e) {
        console.log(e);
      }
    },
    async getCommentsListByPostId(postId) {
      const commentsRef = collection(db, "comments");
      const q = query(
        commentsRef,
        where("postId", "==", postId),
        // eslint-disable-next-line prettier/prettier
        orderBy("createdAt", "asc"),
      );
      const querySnapshot = await getDocs(q);
      this.comments = await Promise.all(
        querySnapshot.docs.map(async (comment) => {
          const commentData = { id: comment.id, ...comment.data() };

          const userSnap = await getDoc(commentData.user);
          const userData = userSnap.data();

          return { ...commentData, user: { ...userData } };
          // eslint-disable-next-line prettier/prettier
        }),
      );
    },
    async getCommentsListByUserId(userId) {
      const commentsRef = collection(db, "comments");
      const q = query(commentsRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      return await Promise.all(
        querySnapshot.docs.map(async (comment) => {
          return { id: comment.id, ...comment.data() };
          // eslint-disable-next-line prettier/prettier
        }),
      );
    },
  },

  getters: {
    getSortedCommentsList() {
      return this.comments.sort((a, b) => b.created_at - a.created_at);
    },
  },
});

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
import { useUiStore } from "./ui";
import { useUserStore } from "./user";

export const useCommentStore = defineStore("comment", {
  state: () => ({
    comments: [],
    selectedUserCommentsList: [],
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
      const ui = useUiStore();
      ui.loading = true;
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
      ui.loading = false;
    },
    async getCommentsListByUserId(userId) {
      const ui = useUiStore();
      ui.loading = true;
      const commentsRef = collection(db, "comments");
      const q = query(commentsRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      this.selectedUserCommentsList = await Promise.all(
        querySnapshot.docs.map(async (comment) => {
          return { id: comment.id, ...comment.data() };
          // eslint-disable-next-line prettier/prettier
        }),
      );
      ui.loading = false;
    },
  },
});

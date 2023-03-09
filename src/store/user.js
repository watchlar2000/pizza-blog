import { auth, db, provider } from "@/firebase/firebaseInit";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { useUiStore } from "./ui";

const userInitState = {
  name: "",
  email: "",
  photoURL: "",
};

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    id: null,
    user: { ...userInitState },
    selectedUser: null,
  }),

  actions: {
    async login() {
      try {
        const res = await signInWithPopup(auth, provider);
        const { uid: id, displayName: name, email, photoURL } = res.user;
        this.setLocalUserData(id, { name, email, photoURL });
        await setDoc(doc(db, "users", id), this.user);
      } catch (e) {
        console.log(e);
      }
    },
    setLocalUserData(id, user) {
      const { name, email, photoURL } = user;
      this.isLoggedIn = true;
      this.id = id;
      this.user = {
        name,
        email,
        photoURL,
      };
    },
    async logout() {
      try {
        await signOut(auth);
        this.isLoggedIn = false;
      } catch (e) {
        console.log(e);
      }
    },
    getLoggedinUser() {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          return;
        }

        const id = user.uid;
        const userRef = doc(db, "users", id);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const { email, name, photoURL } = userSnap.data();
          this.isLoggedIn = true;
          this.id = id;
          this.user = {
            name,
            email,
            photoURL,
          };
        }
      });
    },
    async updateUserName(updatedName) {
      this.user.name = updatedName;
      const userRef = doc(db, "users", this.id);
      await updateDoc(userRef, {
        name: updatedName,
      });
    },
    async getUserById(id) {
      const ui = useUiStore();
      ui.loading = true;
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);
      this.selectedUser = { id: userSnap.id, ...userSnap.data() };
      ui.loading = false;
    },
  },

  getters: {
    isSelectedUserLoggedIn() {
      if (this.selectedUser !== null) {
        return this.id === this.selectedUser.id;
      }
    },
  },
});

import { auth, db, provider } from "@/firebase/firebaseInit";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore/lite";
import { defineStore } from "pinia";

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
    loading: false,
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
      this.loading = true;
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          return;
        }

        const id = user.uid;
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { email, name, photoURL } = docSnap.data();
          this.isLoggedIn = true;
          this.id = id;
          this.user = {
            name,
            email,
            photoURL,
          };
          this.loading = false;
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
  },
});

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
  }),

  actions: {
    async login() {
      try {
        const res = await signInWithPopup(auth, provider);
        const { uid: id, displayName } = res.user;
        this.setUserLocalData(id, displayName);
        await setDoc(doc(db, "users", id), this.user);
        localStorage.setItem("userId", id);
      } catch (e) {
        console.log(e);
      }
    },
    setUserLocalData(id, user) {
      const { name, email, photoURL } = user;
      this.isLoggedIn = true;
      this.id = id;
      this.user = {
        name,
        email,
        photoURL,
      };
    },
    updateUserDatabaseData() {
      console.log("user data is updated in the database");
    },
    async signout() {
      try {
        await signOut(auth);
        // this.isLoggedIn = false;
        // this.id = null;
        // this.user = { ...userInitState };
        console.log("Signed-out successful");
      } catch (e) {
        console.log(e);
      }
    },
    getCurrentUser() {
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
        }
      });
    },
    async updateUserName(updatedName) {
      this.user.name = updatedName;
      const userRef = doc(db, "users", this.id);
      // console.log(userRef);
      // console.log(userRef);
      await updateDoc(userRef, {
        name: updatedName,
      });
    },
  },

  getters: {},
});

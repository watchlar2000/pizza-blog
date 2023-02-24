<template>
  <div>
    <button @click="login">Log in with google</button>
    <h2>{{ JSON.stringify(user) }}</h2>
  </div>
</template>

<script>
import { auth, db } from "@/firebase/firebaseInit";
import { useUserStore } from "@/store/user";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { mapState } from "pinia";

export default {
  name: "LoginView",
  computed: {
    ...mapState(useUserStore, ["user"]),
  },
  methods: {
    async login() {
      const provider = new GoogleAuthProvider();
      console.log(db);
      try {
        const res = await signInWithPopup(auth, provider);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

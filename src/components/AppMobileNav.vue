<template>
  <transition name="mobile-menu">
    <div class="mobile mobile-nav-background" @click.self="toggleMenu">
      <div class="mobile-nav">
        <div class="mobile-header">
          <h1 class="logo">
            <router-link :to="{ name: 'Home' }">Pizza Blog</router-link>
          </h1>
          <a-icon type="close" class="icon close-icon" @click="toggleMenu" />
        </div>

        <nav class="mobile-nav-links">
          <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
          <router-link class="link" :to="{ name: 'CreatePost' }"
            >Create post</router-link
          >
          <router-link class="link" :to="{ name: 'About' }">About</router-link>
          <router-link
            v-if="id && isLoggedIn"
            class="link"
            :to="{ name: 'Profile', params: { id } }"
            >Profile</router-link
          >
        </nav>
        <div v-if="!isLoggedIn" class="not-loggedin">
          <p>You seem to not have logged in yet.</p>
          <button class="button" @click="login">Login</button>
        </div>
        <div v-if="isLoggedIn" class="not-loggedin">
          <button-item @click.native="logout" class="button-logout">
            Logut</button-item
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { useUserStore } from "@/store/user";
import { mapActions, mapState } from "pinia";
import ButtonItem from "./ButtonItem.vue";

export default {
  name: "AppMobileNav",
  components: {
    ButtonItem,
  },
  computed: {
    ...mapState(useUserStore, ["isLoggedIn", "user", "id"]),
  },
  methods: {
    ...mapActions(useUserStore, ["login", "logout"]),
    toggleMenu() {
      this.$emit("toggle-menu");
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile {
  color: #f9f9f9;
}
.link {
  font-size: 18px;
  font-weight: 400;
}

.logo {
  font-family: "Poppins";
  font-size: 32px;
  font-weight: 600;
}

.mobile-nav-background {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #27272766;
  z-index: 5;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 70%;
  max-width: 350px;
  z-index: 999;
  background: #40419f;

  .link {
    color: #424242;
  }
}

.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 83px;
}

.mobile-nav-links {
  flex: 1;
  display: flex;
  gap: 32px;
  margin-top: 18px;
  flex-direction: column;

  a {
    font-size: 28px;
  }
}

// Transitions
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.15s ease;
}

.mobile-menu-enter,
.mobile-menu-leave-to {
  opacity: 0;
}

.not-loggedin {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;

  p {
    font-size: 16px;
  }
}

.button-logout {
  background: var(--primary-transparent-50);
  color: var(--secondary-variant);

  &:hover {
    background: var(--primary);
    color: var(--secondary);
  }
}
</style>

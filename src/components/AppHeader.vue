<template>
  <header class="header">
    <h1 class="logo">
      <router-link :to="{ name: 'home' }">Pizza Blog</router-link>
    </h1>
    <div class="nav-wrap" v-show="!mobile">
      <span class="link" @click="login" v-if="!isLoggedIn">Login</span>
      <a-dropdown v-else>
        <a-menu slot="overlay">
          <a-menu-item key="1"> Profile </a-menu-item>
          <a-menu-item key="2">
            <span @click="logout">Logout</span>
          </a-menu-item>
        </a-menu>
        <span class="profile">{{ profileName }}</span>
      </a-dropdown>
    </div>
    <a-icon
      type="menu"
      class="icon menu-icon"
      @click="toggleMobileMenu"
      v-show="mobile"
    />
    <transition name="mobile-nav" v-show="mobile">
      <div
        class="mobile-nav-background"
        @click.self="toggleMobileMenu"
        v-show="mobileMenu"
      >
        <div class="mobile-nav">
          <div class="mobile-header">
            <h1 class="logo">
              <router-link :to="{ name: 'home' }">Pizza Blog</router-link>
            </h1>
            <a-icon
              type="close"
              class="icon close-icon"
              @click="toggleMobileMenu"
            />
          </div>
          <nav class="mobile-nav-links">
            <router-link to="/" class="link">Home</router-link>
            <router-link to="/login" class="link">Login</router-link>
          </nav>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import { useUserStore } from "@/store/user";
import { mapActions, mapState } from "pinia";
import sizes from "../utils/atndBreakpoints";

export default {
  name: "AppHeader",

  data() {
    return {
      mobile: null,
      mobileMenu: null,
      currentWindowWidth: null,
    };
  },
  created() {
    this.isMobile();
    window.addEventListener("resize", this.isMobile);
  },
  computed: {
    ...mapState(useUserStore, ["isLoggedIn", "user"]),
    profileName() {
      const profileName = this.user.name[0];
      return profileName;
    },
  },
  methods: {
    ...mapActions(useUserStore, ["login", "logout"]),
    toggleMobileMenu() {
      this.mobileMenu = !this.mobileMenu;
    },
    isMobile() {
      this.currentWindowWidth = window.innerWidth;

      if (this.currentWindowWidth <= sizes.md) {
        this.mobile = true;
        return;
      }

      this.mobile = false;
      this.mobileMenu = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: transparent;
  border-bottom: 1.5px solid #2a2a2a;
}

.link {
  font-size: 16px;
  font-weight: 600;
}

.logo {
  font-size: 28px;
  font-weight: 600;
}

.mobile-nav-background {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(39, 39, 39, 0.15);
  z-index: 5;
}

.mobile-nav {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 70%;
  max-width: 350px;
  background-color: #beb8c2;
  z-index: 10;
}

.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
}

.nav-wrap,
.nav-links {
  display: flex;
  gap: 18px;
}

.profile {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: #fafafa;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #9874b1;
}
</style>

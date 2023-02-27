<template>
  <header class="header">
    <h1 class="logo">
      <router-link :to="{ name: 'home' }">Pizza Blog</router-link>
    </h1>
    <div class="nav-wrap" v-show="!mobile">
      <span class="link" @click="login" v-if="!isLoggedIn">Login</span>
      <a-dropdown v-else placement="bottomRight">
        <a-menu slot="overlay">
          <a-menu-item key="1">
            <router-link :to="{ name: 'profile', params: { id } }"
              >Profile</router-link
            >
          </a-menu-item>
          <a-menu-item key="2">
            <span @click="logout">Logout</span>
          </a-menu-item>
        </a-menu>
        <span class="profile" v-if="user.photoURL !== ''">
          <img :src="user.photoURL" :alt="user.name" />
        </span>
        <span class="profile" v-else>{{ profileName }}</span>
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

          <div class="mobile-profile" v-show="isLoggedIn">
            <h2>{{ user.name }}</h2>
            <div class="profile-photo">
              <span class="profile" v-if="user.photoURL !== ''">
                <img :src="user.photoURL" :alt="user.name" />
              </span>
              <span class="profile" v-else>{{ this.user.name[0] }}</span>
            </div>
          </div>

          <nav class="mobile-nav-links">
            <span class="link" @click="login" v-if="!isLoggedIn">Login</span>
            <template v-else>
              <router-link
                :to="{ name: 'profile', params: { id } }"
                class="link"
                >Profile</router-link
              >
              <span @click="logout" class="link">Logout</span>
            </template>
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
    ...mapState(useUserStore, ["isLoggedIn", "user", "id"]),

    //     profilePhoto() {
    // const photo = this.user.photoURL;

    // return photo === '' ?  :
    //     }
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
  watch: {},
};
</script>

<style lang="scss" scoped>
.header {
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: transparent;
  border-bottom: 2px solid #2a2a2a;
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

  .link {
    color: #424242 !important;
  }
}

.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.mobile-nav-links,
.mobile-profile {
  display: flex;

  gap: 8px;
  padding: 0 20px;
}

.mobile-nav-links {
  flex-direction: column;
}

.mobile-profile {
  align-items: center;
  justify-content: space-between;
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
  overflow: hidden;
  font-size: 18px;
  font-weight: 600;
  color: #fafafa;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #9874b1;
}
</style>
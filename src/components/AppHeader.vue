<template>
  <header class="header">
    <h1 class="logo">
      <router-link :to="{ name: 'Home' }">Pizza Blog</router-link>
    </h1>
    <div class="nav-wrap" v-show="!mobile">
      <div class="nav-links">
        <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
        <router-link class="link" :to="{ name: 'CreatePost' }"
          >Create post</router-link
        >
      </div>
      <div>
        <span v-if="!isLoggedIn" class="link" @click="login">Login</span>
        <div v-else class="greeting">
          <span class="name">{{ user.name }}</span>
          <a-dropdown placement="bottomRight">
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <router-link v-if="id" :to="{ name: 'Profile', params: { id } }"
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
      </div>
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
              <router-link :to="{ name: 'Home' }">Pizza Blog</router-link>
            </h1>
            <a-icon
              type="close"
              class="icon close-icon"
              @click="toggleMobileMenu"
            />
          </div>

          <div class="mobile-profile" v-show="isLoggedIn">
            <div class="profile-header">
              <h2 class="name">{{ user.name }}</h2>
              <div class="profile-photo">
                <span class="profile" v-if="user.photoURL !== ''">
                  <img :src="user.photoURL" :alt="user.name" />
                </span>
                <span class="profile" v-else>{{ this.user.name[0] }}</span>
              </div>
            </div>

            <router-link
              v-if="id"
              :to="{ name: 'Profile', params: { id } }"
              class="link"
              >Profile</router-link
            >
            |
            <span @click="logout" class="link">Logout</span>
          </div>

          <nav class="mobile-nav-links">
            <span class="link" @click="login" v-if="!isLoggedIn">Login</span>
            <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
            <router-link class="link" :to="{ name: 'CreatePost' }"
              >Create post</router-link
            >
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
    profileName() {
      return "H2";
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
  watch: {
    $route() {
      this.mobileMenu = false;
    },
  },
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
  font-size: 18px;
  font-weight: 400;
}

.nav-links {
  font-weight: 500;
  font-size: 16px;
  color: #424242;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  .link {
    padding: 4px 10px;
  }
  .link:hover {
    color: #2a2a2a !important;
    background: #9874b188;
  }
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
  background: rgba(39, 39, 39, 0.15);
  z-index: 5;
}

.mobile-nav {
  padding: 0 20px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 70%;
  max-width: 350px;
  background-color: #beb8c2;
  z-index: 10;

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

.mobile-nav-links,
.profile-header {
  display: flex;
  gap: 8px;
}

.mobile-nav-links {
  margin-top: 18px;
  flex-direction: column;
}

.mobile-profile {
  padding: 12px;
  background: #9874b145;
  align-items: center;
  justify-content: space-between;

  .link {
    font-size: 13px;
    font-weight: 400;
    color: #424242 !important;
  }
}

.profile-header {
  justify-content: space-between;
  align-items: center;

  .name {
    font-size: 18px;
    font-weight: 500;
  }
}

.nav-wrap,
.nav-links {
  display: flex;
  gap: 18px;
}

.nav-wrap {
  flex: 1;
  display: flex;
  justify-content: flex-end;
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

.greeting {
  /* font-family: "Gravitas"; */
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;

  .name {
    font-weight: 600;
  }
}
</style>

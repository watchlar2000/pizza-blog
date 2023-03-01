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
        <router-link class="link" :to="{ name: 'About' }">About</router-link>
      </div>
      <div>
        <button v-if="!isLoggedIn" class="button button-login" @click="login">
          Login
        </button>
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
    <div class="header-mobile" v-if="mobile">
      <a-icon
        type="menu"
        class="icon menu-icon"
        @click="toggleMobileMenu"
        v-show="mobile"
      />
      <div>
        <button v-if="!isLoggedIn" class="button button-login" @click="login">
          Login
        </button>
        <a-dropdown v-else placement="bottomRight">
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
    <mobile-nav
      v-show="mobileMenu"
      @toggle-menu="toggleMobileMenu"
      @click.native="closeMobileMenu"
    ></mobile-nav>
  </header>
</template>

<script>
import MobileNav from "@/components/MobileNav.vue";
import { useUserStore } from "@/store/user";
import { mapActions, mapState } from "pinia";
import sizes from "../utils/atndBreakpoints";

export default {
  name: "AppHeader",
  components: {
    MobileNav,
  },
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
      return this.user.name[0];
    },
  },
  methods: {
    ...mapActions(useUserStore, ["login", "logout"]),
    toggleMobileMenu() {
      this.toggleVerticalScroll();
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
    closeMobileMenu(e) {
      if (e.target.localName === "a") {
        this.mobileMenu = false;
      }
    },
    toggleVerticalScroll() {
      if (!this.mobileMenu) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
      }
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
  border-bottom: 2px solid var(--primary);
}

.link {
  font-size: 18px;
  font-weight: 400;
}

.nav-links {
  color: var(--primary);
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  .link {
    font-size: 18px;
    font-weight: 600;
    padding: 8px 16px;
    transition: all 0.05s ease-in-out;
  }
  .link:hover {
    color: var(--primary-variant) !important;
    background: var(--background-variant);
  }
}

.logo {
  font-family: "Poppins";
  font-size: 32px;
  font-weight: 600;
  color: var(--primary);
}

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
  background: #bababa;
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

.header-mobile {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>

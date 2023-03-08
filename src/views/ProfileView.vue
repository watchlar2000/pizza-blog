<template>
  <div>
    <div v-if="!loading">
      <div class="profile-img">
        <img
          v-if="user.photoURL !== ''"
          :src="user.photoURL"
          :alt="user.name"
        />
        <span v-else>{{ user.name[0] }}</span>
      </div>
      <div class="profile-data">
        <div class="option">
          Name:
          <div v-if="!editMode">
            <h3 class="value">
              {{ user.name }}
              <a-icon @click="edit" type="edit" class="control pointer" />
            </h3>
          </div>
          <div v-else class="prodile-edit">
            <div>
              <input
                v-model="userName"
                @input="validate"
                class="input"
                placeholder="Your name"
              />
              <p v-if="error" class="error">Please write down your name</p>
            </div>
            <div class="controls">
              <a-icon @click="save" type="save" class="control pointer" />
              <a-icon @click="cancel" type="close" class="control pointer" />
            </div>
          </div>
        </div>
        <div class="option">
          Email:
          <h3 class="value">{{ user.email }}</h3>
        </div>
        <div class="option">
          Posts:
          <h3 class="value">{{ getPostsByAuthor(id).length }}</h3>
        </div>
        <div class="option">
          Comments:
          <h3 class="value">{{ getCommentsListByUserId(id).length }}</h3>
        </div>
      </div>
    </div>
    <loader-item v-show="loading" />
  </div>
</template>

<script>
import LoaderItem from "@/components/LoaderItem.vue";
import { useCommentStore } from "@/store/comment";
import { usePostStore } from "@/store/post";
import { useUserStore } from "@/store/user";
import { mapActions, mapState } from "pinia";

export default {
  name: "ProfileView",
  data() {
    return {
      editMode: false,
      userName: "",
      error: false,
    };
  },
  components: {
    LoaderItem,
  },
  computed: {
    ...mapState(useUserStore, ["user", "id", "loading"]),
    ...mapState(usePostStore, ["getPostsByAuthor"]),
  },
  methods: {
    ...mapActions(useUserStore, ["updateUserName"]),
    ...mapActions(useCommentStore, ["getCommentsListByUserId"]),
    edit() {
      this.editMode = true;
      this.userName = this.user.name;
    },
    cancel() {
      this.editMode = false;
      this.userName = "";
    },
    validate() {
      if (this.userName.trim() === "") {
        this.error = true;
      } else {
        this.error = false;
      }
    },
    save() {
      if (!this.error) {
        this.updateUserName(this.userName);
        this.cancel();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-img {
  margin-inline: auto;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}

.profile-data {
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  text-align: center;

  .option {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }

  .value {
    font-weight: 600;
    color: #2a2a2a;
  }
}

.prodile-edit,
.controls {
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.control {
  font-size: 16px;
}

.control:hover {
  color: #2a2a2ab6;
}

.button {
  margin-top: 14px;
  cursor: pointer;
  color: #dfdfdfe7;
  background: #2a2a2a;
  width: 120px;
  padding: 5px 20px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.1s ease-in-out;
}
</style>

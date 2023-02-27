<template>
  <div class="profile" v-if="user.name">
    <div class="profile-img">
      <img v-if="user.photoURL !== ''" :src="user.photoURL" :alt="user.name" />
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
          <input v-model="userName" class="input" />
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
        Comments:
        <h3 class="value">0</h3>
      </div>
    </div>

    <!-- <form class="profile-form">
      <label class="label">
        Name:
        <input v-model="user.name" class="input" />
      </label>
      <label class="label">
        Email:
        <input v-model="user.email" class="input" />
      </label>

      <button class="button button-save">Save</button>
    </form> -->
  </div>
</template>

<script>
import { useUserStore } from "@/store/user";
import { mapActions, mapState } from "pinia";

export default {
  name: "ProfileView",
  data() {
    return {
      editMode: false,
      userName: "",
    };
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
  },
  methods: {
    ...mapActions(useUserStore, ["updateUserName"]),
    edit() {
      this.editMode = true;
      this.userName = this.user.name;
    },
    cancel() {
      this.editMode = false;
      this.userName = "";
    },
    save() {
      console.log(this.userName);
      this.updateUserName(this.userName);
      this.cancel();
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
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
  display: flex;
  align-items: center;
  gap: 10px;
}

.control {
  font-size: 16px;
}

.control:hover {
  color: #2a2a2ab6;
}

.input {
  padding: 4px 12px;
  background: #ea8d5e;
  transition: all 0.1s ease-in-out;
  font-size: 16px;
}

.input:focus {
  background: #f59667;
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

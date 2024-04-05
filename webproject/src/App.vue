<template>
  <div id="app">
    <com-header v-if="isUser" />
    <!-- <com-menu-bar v-if="isUser" /> -->
    <div class="main-content">
      <router-view />
      <sidebar v-if="isAdmin" />
    </div>
    <comp-footer v-if="isUser" />
  </div>
</template>

<script>
import ComHeader from "./components/layouts/ComHeader.vue";
import ComMenuBar from "./components/layouts/ComMenuBar.vue";
import CompFooter from "./components/layouts/CompFooter.vue";
import Sidebar from "./components/Sidebar.vue";
import { EventBus } from './event-bus.js';
export default {
  name: "app",
  created() {
    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
    if (isUserLoggedIn) {
      this.isUser = JSON.parse(isUserLoggedIn);
    } else {
      this.isUser = true;
    }

    EventBus.$on('userLoggedIn', (data) => {
      this.isUser = data.isUser; 
      // Lưu trạng thái đăng nhập vào Local Storage
      localStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUser));
    });
    // EventBus.$on('userLoggedIn', (data) => {
    //   this.isUser = data.isUser; 
    //   console.log(this.isUser);
    // })
  },
  data() {
    return {
      isUser: true, // Mặc định, người dùng là user
    };
  },
  
  computed: {
    isAdmin() {
      return !this.isUser; // Nếu người dùng là user, isAdmin sẽ là false; ngược lại, là true
    }
  },
  components: {
    ComHeader,
    CompFooter,
    ComMenuBar,
    Sidebar,
  },
};
</script>

<style>
</style>

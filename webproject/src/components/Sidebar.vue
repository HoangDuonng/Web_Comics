<template>
  <div>
    <button
      @click="toggleSidebar"
      class="toggle-button"
      v-if="windowWidth <= 767"
    >
      &#9776;
    </button>
    <div class="sidebar" :class="{ open: sidebarOpen }">
      <div class="sidebar-header">Admin Panel</div>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/storylist" class="nav-link"
            >Quản lý truyện</router-link
          >
          <ul class="sub-menu">
            <li>
              <router-link to="/storylist">Danh sách đọc truyện</router-link>
            </li>
            <li>
              <router-link to="addbook">Thêm truyện</router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link to="/userlist" class="nav-link">Người dùng</router-link>
          <ul class="sub-menu">
            <li>
              <router-link to="/userlist">Danh sách người dùng</router-link>
            </li>
            <li>
              <router-link to="/adduser">Thêm người dùng</router-link>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/authorm" class="nav-link"
            >Quản lý Tác Giả</router-link
          >
          <ul class="sub-menu">
            <li>
              <router-link to="/authorm">Danh sách tác giả</router-link>
            </li>
            <li>
              <router-link to="addauthor">Thêm tác giả</router-link>
            </li>
          </ul>
        </li>
        <!-- Add more sidebar items as needed -->
      </ul>
      <div class="admin-info">
        <!-- <span>Tên Admin: {{ username }} </span> -->
        <button @click="logout" class="logout-button">Đăng xuất</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import { RouterLink } from "vue-router";
import { EventBus } from '../event-bus';
export default {
  name: "Sidebar",
  data() {
    return {
      username: '',
      sidebarOpen: true,
      windowWidth: window.innerWidth,
    };
  },
  created() {
    EventBus.$on('loginSuccessAdmin', function(data) {
        this.loggedIn = true;
        this.username = data.username;
        this.loginSuccessAdmin(data.username); // Gọi hàm loginSuccessAdmin với dữ liệu tương ứng
        //console.log(this.username);
    }.bind(this));
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 767) {
        this.sidebarOpen = false;
      }
    },
    loginSuccessAdmin(username) {
      this.loggedIn = true;
      this.username = username;
      console.log(this.username);
      // console.log("hello");
    },
    logout() {
      localStorage.removeItem('loggedIn');
      EventBus.$emit('userLoggedIn', { isUser: true });
      this.$router.push("/home");
    },
  },
  components: {
    'routerLink': RouterLink,
  },
};
</script>
  
<style scoped>
.admin-info {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 250px;
  background-color: #343a40;
  color: #fff;
  padding: 1rem;
}

.admin-info p {
  margin: 0;
}

.logout-button {
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  cursor: pointer;
  border-radius: 20px; 
}

.logout-button:hover {
  background-color: #fff;
  color: #343a40;
}
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  background-color: #343a40;
  color: #fff;
  padding-top: 3rem;
  transition: width 0.3s ease-in-out;
}

.sidebar:hover {
  width: 300px;
}

.sidebar-header {
  padding: 1rem;
  font-size: 1.5rem;
  text-align: center;
  display: flex;
  align-items: center;
}

.toggle-button {
  position: absolute;
  top: 10%;
  right: 1rem; /* Đặt nút toggle-button sang phải */
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.nav-link {
  color: #fff;
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #495057;
}

.sub-menu {
  display: none;
}

.nav-item:hover .sub-menu {
  display: block;
}

.sub-menu li {
  list-style-type: none;
}

.sub-menu li a {
  color: #fff;
  display: block;
  padding: 0.5rem 2rem;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.sub-menu li a:hover {
  background-color: #495057;
}
@media only screen and (max-width: 767px) {
  .sidebar {
    left: -250px; /* Ẩn sidebar khi màn hình nhỏ hơn hoặc bằng 767px */
  }

  .sidebar.open {
    left: 0; /* Hiển thị sidebar khi mở */
  }
}
</style>

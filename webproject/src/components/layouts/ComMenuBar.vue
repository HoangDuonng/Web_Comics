<template>
  <div class="container-fluid" :class="{ 'sticky': isSticky }">
    <nav class="nav-menu">
      <ul>
        <li><router-link to="/home">Trang chủ</router-link></li>
        <li class="dropdown" @mouseover="showDropdown" @mouseout="hideDropdown">
          <a href="#" @click.prevent>Thể loại</a>
          <ul class="dropdown-content" v-show="isDropdownVisible" @mouseover="showDropdown" @mouseout="hideDropdown">
            <li><router-link to="/actioncategory">Hành động</router-link></li>
            <li><a href="#">Thể loại 2</a></li>
            <li><a href="#">Thể loại 3</a></li>
          </ul>
        </li>
        <li><router-link to="/history">Lịch sử</router-link></li>
        <li><router-link to="/findpicture">Tìm truyện theo hình ảnh</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
export default {
  name: 'comp-menu-bar',
  data() {
    return {
      text: 'TRUYENVUI',
      isDropdownVisible: false,
      searchQuery: '',
      isSticky: false
    };
  },
  methods: {
    showDropdown() {
      this.isDropdownVisible = true;
    },
    hideDropdown() {
      this.isDropdownVisible = false;
    },
    handleScroll() {
      this.isSticky = window.scrollY > 70;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  components:{
    RouterLink
  }
}
</script>

<style scoped>
.container-fluid {
  background-color:  rgb(247, 244, 244);
}
.nav-menu {
  max-width: 100%;
  display: flex;
  justify-content: center;
  background-color:  rgb(247, 244, 244);
  height: 40px;
  margin: 0px auto;
}

.nav-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-menu ul li {
  display: inline-block;
  margin-right: 80px;
}

.nav-menu ul li:last-child {
  margin-right: 0;
}

.nav-menu ul li a {
  display: block;
  color: rgb(0, 0, 0);
  padding: 10px 20px;
  text-decoration: none;
}

.nav-menu ul li a:hover {
  color: rgb(198, 18, 18);
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  width: 200px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: 5px;
}

.dropdown-content li {
  display: flex;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
</style>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top">
    <router-link class="navbar-brand" to="/home"><img :src="require(`@/assets/truyenvui.jpg`)"></router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/home">Trang chủ</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            Thể loại
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link v-for="(category, index) in categories" :key="index" to="/actioncategory" class="dropdown-item">
              <p @click="categoryName(category)">{{ category }}</p>
            
            </router-link>
          </div>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/history">Lịch sử</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/findpicture">Tìm kiếm theo hình ảnh</router-link>
        </li>
      </ul>
      <div class="search-container d-flex align-items-center">
        <div class="search-input-container">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
            v-model="searchTerm" @input="getSuggestions" @blur="hideSuggestions">
          <div v-if="showSuggestions" class="suggestions">
            <div v-for="(suggestion, index) in filteredSuggestions" :key="index"
              @click="selectSuggestion(suggestion._id)">
              <img :src="`http://localhost:3000/images/${suggestion.anhbia}`" :alt="suggestion.title"
                class="suggestion-image">
              <span>{{ truncateTitle(suggestion.tentruyen, 20) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ml-3">
        <template v-if="!loggedIn">
          <router-link to="/login" class="btn">Đăng nhập</router-link>
          <router-link to="/register" class="btn">Đăng kí</router-link>
        </template>
        <template v-else>
          <span>{{ username }}</span>
          <button @click="logout" class="btn">Đăng xuất</button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import AuthenticaionService from '../../services/AuthenticaionService';
import { RouterLink } from 'vue-router';
import { EventBus } from '@/event-bus';
export default {
  name: 'comp-menu-bar',
  mounted() {
    this.logginsuccess();
    this.category();
  },
  data() {
    return {
      text: 'TRUYENVUI',
      isDropdownVisible: false,
      loggedIn: false,
      username: '',
      searchTerm: '',
      suggestions: [],
      categories: [],
      showSuggestions: false,
    };
  },
  methods: {
    showDropdown() {
      this.isDropdownVisible = true;
    },
    hideDropdown() {
      this.isDropdownVisible = false;
    },
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    hideMenu() {
      this.isDropdownVisible = false;
    },
    logginsuccess() {
      if (localStorage.getItem('loggedInGoogle') === 'true') {
        this.loggedIn = true;
        this.username = localStorage.getItem('usernameGoogle');
      } else if (localStorage.getItem('loggedIn') === 'true') {
        this.loggedIn = true;
        this.username = localStorage.getItem('username');
      }
    },
    logout() {
      localStorage.clear();
      localStorage.setItem('loggedInGoogle', false);
      // localStorage.removeItem(
      //   'storyid', 'categoryName','authGoogleID', 'isUserLoggedIn', 'usernameGoogle', 'username', 'loggedIn'
      // );
      
      this.$router.push("/home");
      this.username = '';
      location.reload();
    },
    selectSuggestion(id) {
      this.showSuggestions = false;
      this.$router.push({ name: "Introduction", params: { storyid: id }, query: { storyid: id } })
      this.searchTerm = '';
    },
    async getSuggestions() {
      this.suggestions = [];
      if (this.searchTerm.trim() !== '') {
        try {
          const res = await AuthenticaionService.searchStory(this.searchTerm);
          for (let i = 0; i < res.data.story.length; i++) {
            this.suggestions.push(res.data.story[i])
          }
          this.showSuggestions = true;
        } catch (error) {
          console.log(error);
        }
      } else {
        this.hideSuggestions();
      }
    },
    async category() {
      try {
        const response = await AuthenticaionService.getCategory();
        for (let i = 0; i < response.data.categoryObjects.length; i++) {
          this.categories.push(response.data.categoryObjects[i].name)
        }
      } catch (error) {
        console.log(error);
      }
    },
    categoryName(category) {
      localStorage.setItem('categoryName', category)
      this.$router.push({ name: "ActionCategory", params: { categoryName: category }, query: { categoryName: category } });
      window.location.reload();
    },
    hideSuggestions() {
      if (this.searchTerm.trim() === '') {
        this.showSuggestions = false;
      }
    },
    truncateTitle(title, maxLength) {
      if (title.length > maxLength) {
        return title.slice(0, maxLength) + '...';
      }
      return title;
    },
  },
  computed: {
    filteredSuggestions() {
      return this.suggestions.filter(suggestion =>
        suggestion.tentruyen.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

  },
  components: {
    'routerLink': RouterLink,
  },
  created() {
    EventBus.$on('loginSuccess', () => {
      this.logginsuccess();
    });
  }
}
</script>

<style scoped>
.navbar-brand img {
  width: 200px;
}

nav {
  font-size: 15px;
  font-family: Chocopy, sans-serif;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-item,
.form-control,
.btn {
  font-size: 15px !important;
}

.navbar-brand {
  color: black !important;
  /* Maintain black color */
  font-size: 30px;
}

.navbar-nav .nav-item .nav-link {
  color: rgb(0, 0, 0) !important;
  /* White text color */
}

.navbar-nav .nav-item .nav-link:hover {
  color: #10B981 !important;
  border-radius: 15px;
  display: inline-block;
  white-space: nowrap;
}

.dropdown-menu .dropdown-item:hover {
  background-color: #10B981 !important;
  color: white !important;
}

.dropdown-menu .dropdown-item:hover .nav-link {
  color: white !important;
}

.nav-item:hover .dropdown-menu {
  display: block;
}

.navbar-light .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.search-container {
  position: relative;
}

.suggestions {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  z-index: 999;
  background-color: #fff;
  border: 1px solid #ccc;
  width: 100%;
}

.suggestions div {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  width: 100%;
}

.suggestions img {
  width: 50px;
  height: 50px;
  background-size: cover;
  background-position: center;
  margin-right: 5px;
}
</style>

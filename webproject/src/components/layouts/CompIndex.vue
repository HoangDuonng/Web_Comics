<template>
  <div class="container bg-light">
    <div class="carousel slide" id="recommended-carousel" data-ride="carousel" data-interval="5000">
      <!-- Đặt data-interval để chuyển slide tự động sau mỗi 5 giây -->
      <div class="carousel-inner" style="white-space: nowrap">
        <div class="carousel-item" :class="{ active: index === currentIndex }"
          v-for="(stories, index) in groupedStories" :key="index">
          <div class="row">
            <div class="col-md-2" v-for="(story, index) in stories" :key="index" style="padding:0px">
              <div class="card">
                <router-link to="/introduction">
                  <img :src="'http://localhost:3000/images/' + story.anhbia" class="card-img-top" :alt="story.title" />
                  <div class="card-overlay" @click="loadStory(story._id)"></div>
                  <div class="card-name">{{ story.tentruyen }}</div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2> <i style="margin:auto 10px; color:#10B981" class="fas fa-fire"></i>Popular-Comic</h2>
    <div class="content">
      <div class="row">
        <div class="col-lg-5ths col-md-3 col-sm-4 col-6" style="padding:0px" v-for="(story, index) in stories"
          :key="index">
          <router-link to="/introduction" style="text-decoration: none; color: black;">
            <div class="card-content" @click="loadStory(story._id)">
              <img :src="'http://localhost:3000/images/' + story.anhbia" alt="Ảnh truyện" class="story-image" />
              <div class="overlay">
                <div class="text-container">
                  <div class="card-content-title">{{ story.tentruyen }}</div>
                  <div class="card-description">{{ story.noidung }}</div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <h2> <i style="margin-right: 10px; color: #10B981;" class="fas fa-check-circle"></i>Completed Comics</h2>
    <div class="content">
      <div class="row">
        <div class="col-lg-5ths col-md-3 col-sm-4 col-6" style="padding:0px" v-for="(story, index) in stories"
          :key="index">
          <router-link to="/introduction" style="text-decoration: none; color: black;">
            <div class="card-content" @click="loadStory(story._id)">
              <img :src="'http://localhost:3000/images/' + story.anhbia" class="card-img-top" :alt="story.title" />
              <div class="overlay">
                <div class="text-container">
                  <div class="card-content-title">{{ story.tentruyen }}</div>
                  <div class="card-description">{{ story.noidung }}</div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticaionService from '../../services/AuthenticaionService';
import { RouterLink } from 'vue-router';
import { EventBus } from '@/event-bus';
import axios from 'axios';
export default {
  mounted() {
    const logGoogle = localStorage.getItem('loggedInGoogle');
    if (logGoogle === 'true') {
      this.fetchUserData();
    }
    this.getStory()
  },
  data() {
    return {
      currentIndex: 0,
      stories: [],
      myStories: [],
      itemsPerPage: 6,
      googleUsers: [],
    };
  },
  computed: {
    groupedStories() {
      const groups = [];
      for (let i = 0; i < this.stories.length; i += this.itemsPerPage) {
        groups.push(this.stories.slice(i, i + this.itemsPerPage));
      }
      return groups;
    }
  },
  methods: {
    async getUser() {
      try {
        const url = 'http://localhost:3000/login/success';
        const response = await axios.get(url, { withCredentials: true });
        const setUser = response.data.authGoogleID;
        localStorage.setItem('authGoogleID', setUser);
      } catch (err) {
        console.error(err);
      }
    },
    async getStory() {
      try {
        const getStories = await AuthenticaionService.showStories()
        for (let i = 0; i < getStories.data.length; i++) {
          this.stories.push(getStories.data[i])
        }
      } catch (err) {
        console.log(err)
      }
    },
    async fetchUserData() {
      await this.getUser();
      try {
        const ID = localStorage.getItem('authGoogleID');
        const res = await AuthenticaionService.getUserGoogle(ID);
        this.googleUsers = res.data;
        localStorage.setItem('usernameGoogle', this.googleUsers.username);
        EventBus.$emit('loginSuccess');
        console.log(this.googleUsers);
      } catch (error) {
        console.log(error);
      }
    },
    loadStory(id) {
      localStorage.setItem('storyid', id)
      this.$router.push({ name: "Introduction", params: { storyid: id }, query: { storyid: id } });
    },
    prevStory() {
      this.currentIndex = (this.currentIndex - 1 + this.groupedStories.length) % this.groupedStories.length;
    },
    nextStory() {
      this.currentIndex = (this.currentIndex + 1) % this.groupedStories.length;
    }
  },
  components: {
    'router-link': RouterLink
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

/*Carousel*/

.card {
  margin: 10px;
  padding: 0px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  transition: transform 1s ease;
  /* Thêm hiệu ứng transition cho thuộc tính transform */
  transform: scale(1);
}

.card-name {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  /*Màu nền cho phần tên  */
  padding: 10px;
  text-align: center;
  font-size: 25px;
  color: rgb(255, 255, 255);
  /* Màu chữ mặc định */
  transition: color 0.3s ease;
  /* Hiệu ứng chuyển màu */
}

.card-name:hover {
  color: rgb(21, 163, 66);
  /* Màu chữ khi hover */
  text-decoration: transparent;
}

.card img {
  width: 100%;
  height: 300px;
  /* Đặt kích thước cố định cho chiều cao */
  object-fit: cover;
  /* Đảm bảo rằng hình ảnh sẽ được căn chỉnh và cắt bớt */
  transition: transform 0.5s ease;
  /*Thêm hiệu ứng transition cho thuộc tính transform của hình ảnh*/
}

.card:hover img {
  transform: scale(1.1);
  /*Phóng to 10% khi di chuột qua*/
}

/*Content*/
.content {
  padding: 10px;
}

.card-content-title,
.card-description {
  font-size: 20px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
}

.card-content:hover .card-content-title,
.card-content:hover .card-description {
  color: rgb(21, 163, 66);
  /* Màu chữ khi hover */
}

.card-content {
  margin: 10px;
  padding: 0px;
  overflow: hidden;
  position: relative;
  transition: transform 2s ease;
}

.card-content img {
  width: 100%;
  height: 400px;
  /* Đặt kích thước cố định cho chiều cao */
  object-fit: cover;
  /* Đảm bảo rằng hình ảnh sẽ được căn chỉnh và cắt bớt */
  transition: transform 0.5s ease;
  /* Thêm transition cho thuộc tính transform */
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 10px;
  transition: all 1.5s ease;
}

.text-container {
  padding: 10px;
  /* Khoảng cách giữa tên truyện và mô tả */
}

.card-content:hover img {
  transform: scale(1.1);
  /* Phóng to 10% khi hover vào */
}
</style>
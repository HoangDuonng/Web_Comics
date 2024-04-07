<template>
  <div class="container">
    <h2>Truyện thể loại {{categoryName}}</h2>
    <div class="content">
      <div class="row">
        <div class="col-lg-5ths col-md-3 col-sm-4 col-6" style="padding:0px" v-for="(story, index) in stories" :key="index">
          <router-link to="/introduction" style="text-decoration: none; color: black;">
            <div class="card-content" @click="setStory(story._id)">
              <img :src="'http://localhost:3000/images/' + story.anhbia" class="card-img-top equal-image-content" :alt="story.title" />
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
    <div class="pagination">
      <a v-for="pageNumber in totalPages" :key="pageNumber" @click="changePage(pageNumber)"
         :class="{ 'active': pageNumber === currentPage }">{{ pageNumber }}</a>
    </div>
  </div>
</template>

<script>
import AuthenticaionService from '../../services/AuthenticaionService';
import { RouterLink } from 'vue-router';
import { EventBus } from '@/event-bus';
export default {
  name: 'action-category',
  mounted() {
    this.getStoryCategory()
  },
  data() {
    return {
      categoryName: this.$route.query.categoryName || localStorage.getItem('categoryName'),
      stories: [],
      perPage: 5,
      currentPage: 1
    };
  },
  computed: {
    displayedStories() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.stories.slice(start, start + this.perPage);
    },
    totalPages() {
      return Math.ceil(this.stories.length / this.perPage);
    }
  },
  methods: {
    changePage(pageNumber) {
      this.currentPage = pageNumber;
      window.scrollTo(0, 0); 
    },
    async getStoryCategory() {
      try {
        const id = this.$route.query.categoryName || localStorage.getItem('categoryName');
        const res = await AuthenticaionService.getStoryCategory(id);
        for (let i = 0; i < res.data.stories.length; i++) {
          this.stories.push(res.data.stories[i]);
        }
      } catch (error) {
        console.log(error);
      }
    },
    setStory(id) {
      localStorage.setItem('storyid', id);
    }
  }
};
</script>

<style scoped>
.card-content-title, .card-description{
  font-size: 20px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
}
.container {
  margin: 20px auto;
}
.description-box {
  width: 100%;
  background-color: rgb(27, 255, 156);
  border: 1px solid #ccc;
  font-size: 20px;
  border-radius: 5px;
  height: auto; /* Đặt chiều cao tự động */
  text-align: left;
  overflow-wrap: break-word; /* Phân chia từng từ để tránh tràn ra ngoài */
  display: inline-block; /* Hiển thị như một khối mở rộng theo nội dung */
  vertical-align: top; /* Căn chỉnh theo vị trí dọc */
  padding: auto;
}
.description-box i{
  padding:10px;
  font-size:30px;
}
@media (max-width: 768px) {
  .description-box {
    font-size: 14px; /* Decrease font size for smaller screens */
    padding: 5px; /* Decrease padding for smaller screens */
  }
  .description-box i{
    font-size: 14px;
  }
}
.content{
  padding:10px;
}

.card-content-title,.card-description{
  font-size: 20px;
}
.card-content:hover .card-content-title,
.card-content:hover .card-description {
  color: rgb(21, 163, 66); /* Màu chữ khi hover */
}
.card-content{
  margin: 10px;
  padding:0px;
  overflow: hidden;
  position: relative;
  transition: transform 2s ease;
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
  padding: 10px; /* Khoảng cách giữa tên truyện và mô tả */
}
.card-content img {
  width: 100%;
  height: 400px; /* Đặt kích thước cố định cho chiều cao */
  object-fit: cover;
  transition: transform 0.5s ease; /* Thêm transition cho thuộc tính transform */
}
.card-content:hover img {
  transform: scale(1.1); /* Phóng to 10% khi hover vào */
}
.pagination {
    margin-top: 20px;
    display: flex;
    justify-content: right;
}
.pagination a {
    padding: 8px 16px;
    text-decoration: none;
    color: black;
    border: 1px solid #ddd;
    transition: background-color 0.3s;
    cursor: pointer;
}
.pagination a.active {
    background-color: #333;
    color: white;
    border: 1px solid #333;
}
.pagination a:hover:not(.active) {
    background-color: #ddd;
}
</style>
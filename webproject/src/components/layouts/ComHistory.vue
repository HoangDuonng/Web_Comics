<template>
  <div class="container">
    <div class="content">
      <div class="row">
        <div class="col-lg-5ths col-md-3 col-sm-4 col-6" v-for="(story, index) in displayedHistory" :key="index">
          <div class="card-content">
            <router-link to="/introduction" style="text-decoration: none; color: black;">
              <img :src="`http://localhost:3000/images/` + story.anhbia" class="card-img-top equal-image-content" @click="loadStory(story._id)" />
            </router-link>
            <div class="overlay">
              <div class="text-container">
                <div class="card-content-name">{{ story.tentruyen }}</div>
                <div class="button-group">
                  <button class="btn btn-primary" @click="loadStory(story._id)">
                    <i class="fas fa-book-open"></i> Đọc tiếp
                  </button>
                  <button class="btn btn-danger" @click="deleteStory(story._id)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
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
export default {
  name: 'com-history',
  mounted() {
    this.getStoryRead()
  },
  data() {
    return {
      img: '',
      tentruyen: '',
      historys: [],
      currentPage: 1,
      itemsPerPage: 8
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.historys.length / this.itemsPerPage);
    },
    displayedHistory() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.historys.slice(startIndex, endIndex);
    }
  },
  methods: {
    async getStoryRead() {
      try {
        const res = await AuthenticaionService.readHistory();
        for (let i = 0; i < res.data.length; i++) {
          this.historys.push(res.data[i])
        }
      } catch (error) {
        console.error(error);
      }
    },
    loadStory(id) {
      localStorage.setItem('storyid', id)
      this.$router.push({ name: "Introduction", params: { storyid: id }, query: { storyid: id } });
    },
    changePage(page) {
      this.currentPage = page;
    },
    async deleteStory(id) {
      try {
        const res = await AuthenticaionService.removeHistory(id);
        window.location.reload();
      } catch (error) {

      }
    }
  },
  components: {
    'router-link': RouterLink
  }
}
</script>

<style scoped>
.container {
  margin: 20px auto;
}

.content {
  padding: 10px;
}

.card-content-name,
.card-date {
  font-size: 20px;
  font-size: 20px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
}

.card-content:hover .card-content-name,
.card-content:hover .card-date {
  color: rgb(21, 163, 66);
  /* Màu chữ khi hover */
}

.card-content {
  margin: 10px;
  padding: 0px;
  overflow: hidden;
  position: relative;
  transition: transform 1s ease;
  transform: scale(1.1);
}

.card-content img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card-content:hover img {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 10px;
  transition: transform 1.5s ease;
}

.text-container {
  padding: 10px;
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

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  z-index: 10;
}

router-link {
  position: relative;
  z-index: 1;
}

.button-group button {
  margin: 0 5px;
  padding: auto 20px;
}

@media screen and (max-width: 768px) {
  .button-group {
    flex-direction: column;
    align-items: center;
  }

  .button-group button {
    width: 100%;
    margin-bottom: 10px;
  }

}

.col-lg-5ths,
.col-md-3,
.col-sm-4,
.col-6 {
  margin-bottom: 30px;
}
</style>
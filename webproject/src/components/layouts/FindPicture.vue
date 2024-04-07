<template>
  <div class="container">
    <h2 class="text-center">Tìm Kiếm Truyện theo hình ảnh</h2>
    <div class="search-container">
      <form class="search-form" @submit.prevent="searchStory">
        <input type="file" class="search-input" accept="image/*" @change="handleImageUpload" multiple>
        <button type="submit" class="search-button">Tìm kiếm</button>
      </form>
    </div>
    <div class="result" v-if="searchResults.length > 0">
      <h3>Kết quả tìm kiếm:</h3>
      <div v-for="(result, index) in searchResults" :key="index">
        <img :src="result.image" alt="Ảnh truyện">
        <p>{{ result.title }}</p>
      </div>
    </div>
    <h2 class="text-center mt-4">Danh Sách Truyện</h2>
    <div class="content">
      <div class="row">
        <div class="col-lg-5ths col-md-3 col-sm-4 col-6" style="padding:0px" v-for="(story, index) in stories" :key="index">
          <router-link :to="story.link" style="text-decoration: none; color: black;">
            <div class="card-content">
              <img :src="require(`@/assets/${story.img}`)" class="card-img-top equal-image-content" :alt="story.title" />
              <div class="overlay">
                <div class="text-container">
                  <div class="card-content-title">{{ story.title }}</div>
                  <div class="card-description">{{ story.description }}</div>
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
export default {
  data() {
    return {
      selectedImages: [],
      searchResults: [],
      stories: [
        { id: 1, img: '2.jpg', title: 'Tên truyện 1', description: 'Mô tả ngắn về truyện 1', link: '#' },
        { id: 2, img: '2.jpg', title: 'Tên truyện 1', description: 'Mô tả ngắn về truyện 1', link: '#' },
        { id: 3, img: '3.jpg', title: 'Tên truyện 1', description: 'Mô tả ngắn về truyện 1', link: '#' },
        { id: 4, img: '4.jpg', title: 'Tên truyện 1', description: 'Mô tả ngắn về truyện 1', link: '#' },
        { id: 5, img: '5.jpg', title: 'Tên truyện 1', description: 'Mô tả ngắn về truyện 1', link: '#' },
        { id: 6, img: '6.jpg', title: 'Tên truyện 1', description: 'Mô tả ngắn về truyện 1', link: '#' },
        { id: 7, img: '7.jpg', title: 'Tên truyện 1', description: 'Mô tả ngắn về truyện 1', link: '#' },
        { id: 8, img: '8.jpg', title: 'Tên truyện 1', description: 'Mô tả ngắn về truyện 1', link: '#' },
        { id: 9, img: '9.jpg', title: 'Tên truyện 1', description: 'Mô tả ngắn về truyện 1', link: '#' },
      ],
      perPage: 20,
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
      window.scrollTo(0, 0); // Cuộn trang lên đầu
    },
    handleImageUpload(event) {
      this.selectedImages = Array.from(event.target.files);
    },
    searchStory() {
      let formData = new FormData();
      this.selectedImages.forEach(image => {
        formData.append('images[]', image);
      });

      axios.post('/search', formData)
        .then(response => {
          this.searchResults = response.data;
        })
        .catch(error => {
          console.error('Error searching for stories:', error);
        });
    }
  }
};
</script>

<style scoped>
.container {
  margin: 20px auto;
}

.equal-image-content {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.content {
  padding: 10px;
}

.card-content-title, .card-description {
  font-size: 20px;
}

.card-content:hover .card-content-title,
.card-content:hover .card-description {
  color: rgb(21, 163, 66);
}

.card-content {
  margin: 10px;
  padding: 0px;
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
  padding: 10px;
}

.card-content:hover img {
  transform: scale(1.1);
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
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

.carousel-item {
  transition: transform 0.6s ease;
}

.search-container {
  display: flex;
  justify-content: center;
}

.search-form {
  display: flex;
}

.search-input {
  margin-right: 10px;
}

.result {
  margin-top: 20px;
}
.search-container,.search-form,.search-input{
  font-size:18px;
}
</style>

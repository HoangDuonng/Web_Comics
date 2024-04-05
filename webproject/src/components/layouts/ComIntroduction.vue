<template>
  <div class="container-fluid">
    <div class="container">
      <div class="content">
        <div class="banner">
          <img :src="`http://localhost:3000/images/${img}`">
        </div>
        <div class="story-details">
          <h1>{{ storyTitle }}</h1>
          <div class="category-button">
            <router-link class="btn-category" to="/actioncategory" :key="category.id">
              <p @click="getCategory(category)">Thể loại: {{ category }}</p>
            </router-link>
          </div>
          <p>Tên khác: {{ name }}</p>
          <p>Tác giả: {{ author }}</p>
          <p>Tình trạng: <i class="fas fa-spinner" style="margin:auto 5px;color:#3ef4a2"></i> {{ status }}</p>
          <p>Nội dung: {{ introduction }}</p>
          <div>
            <router-link to="/doctruyen"><button class="btn"><i class="fas fa-book-open"
                  style="margin:auto 5px;"></i>Đọc Ngay</button></router-link>
          </div>
        </div>
      </div>
      <div class="chapter-list">
        <h4 style="margin:auto 5px;color:#3ef4a2"><i class="fas fas fa-file-alt"
            style="margin:auto 5px;color:#3ef4a2"></i>Chapters</h4>
        <hr class="chapter-divider">
        <div class="showchapter">
          <button v-for="range in ranges" :key="range" :class="{ 'range-btn': true, 'active': currentRange === range }"
            @click="showChapter(range)">
            {{ range }}
          </button>
        </div>
        <div class="chapter-grid row">
          <router-link style="color:black" to="/doctruyen" v-for="(chapter, index) in chapters" :key="index"
            class="mb-4 chapter">
            <div>
              <h5 @click="loadChapter(chapter._id)">Chương {{ chapter.chuong_so }}</h5>
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

export default {
  name: 'comp-introduction',
  mounted() {
    this.getStory()
    this.showChapters()
  },
  data() {
    return {
      id: this.$route.query.storyid,
      visibleChapters: [],
      img: "",
      storyTitle: "",
      name: "",
      author: "",
      status: 'Đang cập nhật',
      chapterCount: 50,
      introduction: "",
      showAllChapters: false,
      category: '',
      chapters: [],
      currentRange: '0-10',
      ranges: ['0-10', '11-100'],
    };
  },
  methods: {
    async getStory() {
      try {
        var id = this.$route.query.storyid || localStorage.getItem('storyid');
        const res = await AuthenticaionService.getEditStory(id);
        const read = await AuthenticaionService.readStory(id);
        this.img = res.data.anhbia
        this.storyTitle = res.data.tentruyen
        this.name = res.data.tenphu
        this.author = res.data.tacgia
        this.introduction = res.data.noidung
        this.category = res.data.theloai
      } catch (error) {
        console.log(error);
      }
    },
    async showChapters() {
      var idchapter = this.$route.query.storyid || localStorage.getItem('storyid');
      const getChapter = await AuthenticaionService.getStoryChapter(idchapter);
      for (let i = 0; i < getChapter.data.chapters.length; i++) {
        this.chapters.push(getChapter.data.chapters[i])
      }
    },
    loadChapter(chapterid) {
      localStorage.setItem('chapterid', chapterid)
      this.$router.push({ name: "DocTruyen", params: { idchapter: chapterid }, query: { idchapter: chapterid } })
    },
    getCategory(category) {
      localStorage.setItem('categoryName', category)
    },
    showChapter(range) {
      this.currentRange = range;
      const [start, end] = range.split('-').map(Number);
      this.visibleChapters = this.chapters.slice(start, end);
    },
    truncateText(text, maxLength = 10) {
      return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    },
    selectRange(range) {
      this.currentRange = range;
    },
  },
  components: {
    'routerLink': RouterLink,
  },
};
</script>

<style scoped>
.category-button p {
  text-align: center;
  margin: auto;
}

.container-fluid {
  background: linear-gradient(to bottom, #3ef4a2 10%, #ffffff 30%);
  padding: 20px;
}

.container {
  margin: 20px auto;
  border: 2px solid white;
  border-radius: 20px;
}

.content {
  display: flex;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    /* Hiển thị dọc */
  }
}

.banner {
  flex: 1;
  margin: auto 0px auto 70px;
  max-width: 50%;
}

@media (max-width: 768px) {
  .banner {
    max-width: 100%;
    /* Chiều rộng tối đa 100% */
    margin: auto;
    /* Canh giữa */
  }
}

.banner img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
  margin: auto -30px;
}

.story-details {
  flex: 2;
  text-align: left;
}

@media (max-width: 768px) {
  .story-details {
    width: 100%;
    margin-top: 20px;
  }

  .banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 20px;
    margin: auto 0px;
  }
}

.story-details p {
  margin-top: 0;
  font-size: 17px;
}

.btn {
  border: none;
  border-radius: 5px;
  font-size: 20px;
  padding: 10px;
  margin-top: 10px;
  background-color: rgb(62, 244, 162, 1.5);
  color: white;
}

a {
  text-decoration: none;
}

.chapter-divider {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 10px auto;
}

.category-button {
  margin-top: 10px;
}

.btn-category {
  display: inline-block;
  border: solid rgb(62, 244, 162, 1.2);
  border-radius: 5px;
  font-size: 16px;
  padding: 8px 16px;
  margin-right: 10px;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
}

.btn-category:hover {
  background-color: rgb(62, 244, 162);
}

.chapter-list ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chapter-list {
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 40px;
}

.showchapter {
  overflow: hidden;
  margin-bottom: 10px;
}

.range-btn {
  background-color: white;
  color: rgb(5, 154, 87);
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  float: left;
  margin-right: 20px;
}

.range-btn.active {
  background-color: rgb(5, 154, 87);
  color: white;
  border: none;
}

.range-btn:last-child {
  margin-right: 0;
}

.chapter {
  border: 1px solid #ccc;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px;
}

.chapter:hover {
  background-color: rgb(62, 244, 162, 0.2);
}

.chapter-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  align-items: flex-start;
  flex-wrap: nowrap;
}

.chapter-grid .col-md-3 {
  padding: 0 15px;
}

.chapter-link {
  display: block;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

@media (max-width: 768px) {
  .chapter-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .chapter-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>

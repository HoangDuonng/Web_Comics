<template>
  <div class="container">
    <div class="chapter-navigation">
      <button @click="goToHomePage"><i class="fa fa-home"></i></button>
      <button @click="reloadPage"><i class="fa fa-undo error"></i></button>
      <button @click="prevChapter">&#9664;</button>
      <select v-model="selectedChapter" @change="changeChapterUp">
        <option v-for="(chapter, index) in chapters" :key="index" :value="(chapter._id)">
          Chương {{ chapter.chuong_so }}
        </option>
      </select>
      <button @click="nextChapter">&#9654;</button>
    </div>
    <div class="chapter-content">
      <img v-for="(image, index) in currentChapterImages" :key="index"
        :src="'http://localhost:3000/images/chuongImgs/' + image" />
    </div>
    <div class="chapter-navigation" style="margin-top: 20px">
      <div>
        <button @click="prevChapter">&#9664;</button>
        <select v-model="selectedChapter" @change="changeChapterDown">
          <option v-for="(chapter, index) in chapters" :key="index" :value="(chapter._id)">
            Chương {{ chapter.chuong_so }}
          </option>
        </select>
        <button @click="nextChapter">&#9654;</button>
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticaionService from '../../services/AuthenticaionService';
export default {
  mounted() {
    this.Chapter();
    this.showChapters();
  },
  data() {
    return {
      id: this.$route.params.storyid,
      chapterid: this.$route.params.idchapter,
      selectedChapter: "",
      chapters: [],
      chapterImages: {
        1: ["chapter/1.jpg", "./chapter/1-2.jpg", "./chapter/1-5.jpg"],
        2: ["./chapter/1.jpg", "./chapter/1-2.jpg"],
        3: [
          "./chapter/1.jpg",
          "./chapter/1-2.jpg",
        ],
      },
      currentChapterImages: [],
    };
  },
  methods: {
    async Chapter() {
      try {
        var idchapter = this.$route.params.idchapter || localStorage.getItem('chapterid');
        const getChapterImg = await AuthenticaionService.getChapterImgs(idchapter);
        for (let i = 0; i < getChapterImg.data.dataImg.length; i++) {
          this.currentChapterImages.push(getChapterImg.data.dataImg[i])
        }
        return this.currentChapterImages;
      } catch (error) {
        console.log(error)
        return [];
      }
    },
    async showChapters() {
      var idchapter = this.$route.query.storyid || localStorage.getItem('storyid');
      const getChapter = await AuthenticaionService.getStoryChapter(idchapter);
      for (let i = 0; i < getChapter.data.chapters.length; i++) {
        this.chapters.push(getChapter.data.chapters[i])
      }
    },
    async prevChapter() {
      const currentIndex = this.chapters.findIndex(chapter => chapter._id === this.selectedChapter);
      if (currentIndex > 0) {
        this.selectedChapter = this.chapters[currentIndex - 1]._id;
      }
      localStorage.setItem('chapterid', this.selectedChapter);
      try {
        this.currentChapterImages = [];
        this.currentChapterImages = await this.Chapter();
      } catch (error) {
        console.error('Error loading data:', error);
      }
    },
    async nextChapter() {
      const currentIndex = this.chapters.findIndex(chapter => chapter._id === this.selectedChapter);
      if (currentIndex < this.chapters.length - 1) {
        this.selectedChapter = this.chapters[currentIndex + 1]._id;
      }
      localStorage.setItem('chapterid', this.selectedChapter);
      try {
        this.currentChapterImages = [];
        this.currentChapterImages = await this.Chapter();
      } catch (error) {
        console.error('Error loading data:', error);
      }
    },
    async changeChapterUp() {
      localStorage.setItem('chapterid', this.selectedChapter);
      try {
        this.currentChapterImages = [];
        this.currentChapterImages = await this.Chapter();
      } catch (error) {
        console.error('Error loading data:', error);
      }
    },
    async changeChapterDown() {
      localStorage.setItem('chapterid', this.selectedChapter);
      try {
        this.currentChapterImages = [];
        this.currentChapterImages = await this.Chapter();
      } catch (error) {
        console.error('Error loading data:', error);
      }
      window.scrollTo(0, 0);
    },
    goToHomePage() {
      window.location.href = "index.html";
    },
    reloadPage() {
      location.reload(); 
    },
  },
};
</script>
<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
  background-color: #f2f2f2;
}

.chapter-content img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.chapter-navigation {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.chapter-navigation button {
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 5px 5px;
}

.chapter-navigation button:hover {
  background-color: #555;
}

.fa-home {
  font-size: 16px;
  margin-right: 5px;
}
</style>
<template>
  <div class="container">
    <div class="chapter-navigation">
      <button @click="goToHomePage"><i class="fa fa-home"></i></button>
      <button @click="goToHomeBackward"><i class="fa fa-list"></i></button>
      <button @click="reloadPage"><i class="fa fa-undo error"></i></button>
      <button @click="prevChapter">&#9664;</button>
      <select v-model="selectedChapter" @change="changeChapter">
        <option
          v-for="chapter in chapters"
          :value="chapter.value"
          :key="chapter.value"
        >
          {{ chapter.label }}
        </option>
      </select>
      <button @click="nextChapter">&#9654;</button>
    </div>
    <div class="chapter-content">
      <img
        v-for="(image, index) in currentChapterImages"
        :src="image"
        :alt="'Nội dung chương truyện ' + index"
        :key="index"
      />
    </div>
    <div class="chapter-navigation" style="margin-top: 20px">
      <div>
        <button @click="prevChapter">&#9664;</button>
        <select v-model="selectedChapter" @change="changeChapter">
          <option
            v-for="chapter in chapters"
            :value="chapter.value"
            :key="chapter.value"
          >
            {{ chapter.label }}
          </option>
        </select>
        <button @click="nextChapter">&#9654;</button>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      selectedChapter: "1",
      chapters: [
        { value: "1", label: "Chương 1" },
        { value: "2", label: "Chương 2" },
        { value: "3", label: "Chương 3" },
        // Thêm các chương khác vào đây
      ],
      chapterImages: {
        1: ["chapter/1.jpg", "./chapter/1-2.jpg", "./chapter/1-5.jpg"],
        2: ["./chapter/1.jpg", "./chapter/1-2.jpg"],
        3: [
          "./chapter/1.jpg",
          "./chapter/1-2.jpg",
          "./chapter/1-5.jpg",
          "./chapter/1-3.jpg",
        ],
        // Thêm đường dẫn của các hình ảnh khác vào đây
      },
    };
  },
  computed: {
    currentChapterImages() {
      return this.chapterImages[this.selectedChapter];
    },
  },
  methods: {
    prevChapter() {
      const currentIndex = this.chapters.findIndex(
        (chapter) => chapter.value === this.selectedChapter
      );
      if (currentIndex > 0) {
        this.selectedChapter = this.chapters[currentIndex - 1].value;
        this.changeChapter();
      }
    },
    nextChapter() {
      const currentIndex = this.chapters.findIndex(
        (chapter) => chapter.value === this.selectedChapter
      );
      if (currentIndex < this.chapters.length - 1) {
        this.selectedChapter = this.chapters[currentIndex + 1].value;
        this.changeChapter();
      }
    },
    changeChapter() {
      window.scrollTo(0, 0); // Cuộn trang lên đầu
    },
    goToHomePage() {
      // Chuyển hướng đến trang chủ
      window.location.href = "index.html";
    },
    goToHomeBackward() {
      // Chuyển hướng đến trang chủ
      window.location.href = "#";
    },
    reloadPage() {
      location.reload(); // Tải lại trang
    },
  },
};
</script>
<style>
.container {
      max-width: 800px;
      margin: 140px auto;
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
      /* Căn giữa */
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
      /* Kích thước biểu tượng */
      margin-right: 5px;
      /* Khoảng cách giữa biểu tượng và văn bản */
    }</style>
  
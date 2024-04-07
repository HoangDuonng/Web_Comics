<template>
  <div class="add-chapter">
    <h2>Add New Chapter</h2>
    <form @submit.prevent="submitChapter" class="chapter-form">
      <div class="form-group">
        <label for="title">Chương số:</label>
        <input
          type="text"
          id="title"
          v-model="chapterNumber"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="chapter-name">Chapter Name:</label>
        <input
          type="text"
          id="chapter-name"
          v-model="chapterName"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Add Chapter</button>
    </form>
    <div
      class="toast"
      :class="{ show: showToast }"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="me-auto">Thông báo</strong>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="hideToast"
        ></button>
      </div>
      <div class="toast-body">Truyện đã được thêm thành công!</div>
    </div>
  </div>
</template>
  
  <script>
  import { RouterLink } from 'vue-router';
  import AuthenticaionService from '../services/AuthenticaionService';

export default {
  data() {
    return {
      chapterName: "",
      chapterNumber: "",
      images: [],
      storyid: this.$route.params.storyid,
      showToast: false,
    };
  },
  methods: {
    async submitChapter() {
      this.showSuccessMessage = true;
      const chapter = {chuong_so: this.chapterNumber, chuong_ten: this.chapterName, matruyen: ""}
      try{
        const res = await AuthenticaionService.addStoryChapter(this.storyid,chapter)
        if(res.data.success===1){
          this.showToast = true
        }
        this.$router.push({name: "ChapterList", params: {storyid: this.storyid}})
      }catch(error){
        console.log(error)
      }
      // Sau khi thêm thành công, bạn có thể chuyển hướng người dùng đến trang danh sách chương hoặc thực hiện các hành động khác
      // this.$router.push("/chapterlist");
    },
    handleImageChange(event) {
      this.images = Array.from(event.target.files);
    },
    hideToast() {
      // Ẩn toast khi người dùng nhấn nút đóng
      this.showToast = false;
    },
  },
  components: {
    'router-link': RouterLink
  }
};
</script>
  
  <style scoped>
.toast {
  position: fixed;
  top: 50px;
  right: 50px;
  max-width: 300px;
  z-index: 9999;
}

.toast.show {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease;
}
.add-chapter {
  max-width: 600px;
  margin: 0 auto;
}

.chapter-form {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.selected-images ul {
  list-style: none;
  padding: 0;
}

.selected-images li {
  margin-bottom: 5px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
  
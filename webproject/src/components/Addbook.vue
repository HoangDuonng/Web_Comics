<template>
  <div class="thietbi">
    <div class="add-book">
      <h2 class="add-book-title">Thông Tin Truyện</h2>
      <form @submit.prevent="addStory" class="add-book-form">
        <div class="form-group">
          <label for="bookName" class="form-label">Tên truyện:</label>
          <input
            type="text"
            class="form-control"
            id="bookName"
            v-model="bookName"
          />
        </div>
        <div class="form-group">
          <label for="alias" class="form-label">Tên phụ:</label>
          <input type="text" class="form-control" id="alias" v-model="alias" />
        </div>
        <div class="form-group">
          <label for="image" class="form-label">Hình ảnh:</label>
          <input
            type="file"
            class="form-control-file"
            id="image"
            accept="image/*"
            @change="handleImageChange"
          />
        </div>
        <div class="form-group">
          <label for="content" class="form-label">Nội dung truyện:</label>
          <textarea
            class="form-control"
            id="content"
            v-model="content"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="author" class="form-label">Tác giả:</label>
          <input
            type="text"
            class="form-control"
            id="author"
            v-model="author"
          />
        </div>
        <div class="form-group">
          <label for="publisher" class="form-label">Nhà xuất bản:</label>
          <input
            type="text"
            class="form-control"
            id="publisher"
            v-model="publisher"
          />
        </div>
        <div class="form-group">
          <label for="genre" class="form-label">Thể loại:</label>
          <input type="text" class="form-control" id="genre" v-model="genre" />
        </div>
        <button type="submit" class="btn btn-primary">Thêm truyện</button>
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
  </div>
</template>
  
  <script>
import AuthenticaionService from "../services/AuthenticaionService";
export default {
  name: "AddBook",
  data() {
    return {
      bookName: "",
      alias: "",
      image: null,
      author: "", // Thêm dữ liệu tác giả
      publisher: "", // Thêm dữ liệu nhà xuất bản
      genre: "", // Thêm dữ liệu thể loại
      content: "", 
      showToast: false,
    };
  },
  methods: {
    async addStory() {
      // Xử lý logic để thêm truyện vào hệ thống
      const formData = new FormData();
      formData.append("fromName", "Admin");
      formData.append("imageUploads", this.image);
      try {
        const testUpload = [{ fromName: "Admin", imageUploads: this.image }];
        const resImage = await AuthenticaionService.uploadImage(formData);
        if (resImage.data.success === 1) {
          const book = {
            tentruyen: this.bookName,
            tenphu: this.alias,
            anhbia: resImage.data.name,
            tacgia: this.author,
            nxb: this.publisher,
            theloai: this.genre,
            noidung: this.content, 
          };
          const resAddBook = await AuthenticaionService.addNewStory(book);
          if (resAddBook.data.success === 1) {
            this.showToast = true;
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    hideToast() {
      this.showToast = false;
    },
    handleImageChange(event) {
      this.image = event.target.files[0];
    },
  },
};
</script>
  
  <style scoped>
.thietbi {
  margin-left: 250px;
}
.add-book {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.add-book-title {
  margin-bottom: 20px;
  text-align: center;
}

.add-book-form {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-primary {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}
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
@media only screen and (max-width: 768px) {
  .thietbi {
    margin: 0 auto;
  }
}
</style>
  
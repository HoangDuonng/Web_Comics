<template>
  <div class="thietbi">
    <div class="edit-story">
      <h2>Sửa truyện "{{ editedStory.title }}"</h2>
      <form @submit.prevent="getStoryInfo" class="add-book-form">
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
        <button type="submit" class="btn btn-primary">Lưu</button>
      </form>
    </div>
  </div>
</template>

<script>
import AuthenticaionService from "../services/AuthenticaionService";
import { RouterLink } from "vue-router";
export default {
  mounted() {
    this.getStoryInfo();
  },
  data() {
    return {
      id: this.$route.params.storyid,
      editedStory: {
        bookName: "",
        alias: "",
        image: null,
        author: "", // Thêm dữ liệu tác giả
        publisher: "", // Thêm dữ liệu nhà xuất bản
        genre: "", // Thêm dữ liệu thể loại
        content: "",
      },
    };
  },
  methods: {
    async getStoryInfo() {
      try {
        const res = await AuthenticaionService.getEditStory(
          this.$route.params.storyid
        );
        console.log(res.data);
        this.editedStory.bookName = res.data.tentruyen;
        this.editedStory.alias = res.data.tenphu;
        this.editedStory.author = res.data.tacgia;
        this.editedStory.publisher = res.data.nhaxuatban;
        this.editedStory.genre = res.data.theloai;
        this.editedStory.content = res.data.noidung;
        this.editedStory.image = res.data.anhbia;

      } catch (err) {
        console.log(err);
      }
    },
    async submitForm() {
      // Xử lý lưu thông tin truyện (gọi API, cập nhật dữ liệu, v.v.)
      try {
        const body = {
          tentruyen: this.editedStory.bookName,
          tenphu: this.editedStory.alias,
          tacgia: this.editedStory.author,
          nhaxuatban: this.editedStory.publisher,
          theloai: this.editedStory.genre,
          noidung: this.editedStory.content,
          anhbia: this.editedStory.anhbia,
        };
        const res = await AuthenticaionService.updateStory(this.id, body);
        console.log("Thông tin truyện đã được lưu:", this.editedStory);
        this.$router.push("/story-list"); 
      } catch (err) {
        console.log(err);
      }
    },
    handleImageChange(event) {
      this.image = event.target.files[0];
    },
    removeImage(chapterIndex, imgIndex) {
      this.editedStory.chapters[chapterIndex].images.splice(imgIndex, 1);
    },
  },
  components: {
    "router-link": RouterLink,
  },
};
</script>

<style scoped>
.thietbi {
  margin-left: 250px;
}
.edit-story {
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

.edit-form .form-group {
  margin-bottom: 15px;
}

.edit-form .form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.edit-form .btn {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-form .btn-primary {
  background-color: #007bff;
  color: #fff;
}

.edit-form .btn-primary:hover {
  background-color: #0056b3;
}

.edit-form .btn-success {
  background-color: #28a745;
  color: #fff;
}

.edit-form .btn-success:hover {
  background-color: #218838;
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.preview-item {
  margin-right: 10px;
  margin-bottom: 10px;
}

.chapter-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ccc;
}

.chapter-image-preview {
  max-width: 100px;
  height: auto;
  margin-right: 10px;
  margin-bottom: 10px;
}
@media only screen and (max-width: 768px) {
  .thietbi {
    margin: 0 auto;
  }
}
</style>

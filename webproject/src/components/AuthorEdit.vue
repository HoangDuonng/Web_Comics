<template>
  <div class="thietbi">
    <div class="edit-author">
      <h1>Chỉnh sửa thông tin tác giả</h1>
      <form @submit.prevent="submitForm" class="author-form">
        <div class="form-group">
          <label for="author-name">Tên tác giả:</label>
          <input type="text" id="author-name" v-model="editedAuthor.name" class="form-control" />
        </div>
        <div class="form-group">
          <label for="author-bio">Giới thiệu:</label>
          <textarea id="author-bio" v-model="editedAuthor.bio" class="form-control"></textarea>
        </div>
        <div class="form-group">
          <label for="author-avatar">Tải ảnh đại diện lên:</label>
          <input type="file" id="image" for="image" multiple @change="handleImageUpload($event)" accept="image/*"
            class="form-control-file" />
        </div>
        <button type="submit" class="btn btn-primary">Lưu</button>
      </form>

      <div v-if="showSuccessMessage" class="success-message">Thông tin tác giả đã được lưu thành công!</div>
      <form @submit.prevent="submitForm" class="author-form">
      </form>
    </div>
  </div>
</template>

<script>
import AuthenticaionService from '../services/AuthenticaionService';
import { RouterLink } from 'vue-router'
export default {
  mounted() {
    this.getAuthorInfo()
  },
  data() {
    return {
      id: this.$route.params.authorid,
      editedAuthor: {
        name: "",
        bio: "",
        avatar: "",
      },
      books: [],
      showSuccessMessage: false,
    };
  },
  methods: {
    async getAuthorInfo() {
      try {
        const res = await AuthenticaionService.getEditAuthor(this.$route.params.authorid)
        this.editedAuthor.name = res.data.author.tentacgia
        this.editedAuthor.bio = res.data.author.gioithieu
      } catch (err) {
        console.log(err)
      }
    },
    async submitForm() {
      const formData = new FormData()
      formData.append('fromName', "Admin")
      formData.append('imageUploads', this.image)

      try {
        const resImage = await AuthenticaionService.uploadImage(formData)
        if (resImage.data.message === "success") {
          const body = { tentacgia: this.editedAuthor.name, gioithieu: this.editedAuthor.bio, hinhdaidien: resImage.data.name }
          const resEditAuthor = await AuthenticaionService.updateAuthor(this.id, body)
          if (resEditAuthor.data.message === "success") {
            console.log("Thông tin tác giả đã được lưu")
          }
        }
        console.log("Thông tin tác giả đã được lưu:", this.editedAuthor)
        this.$router.push("/authorm")
      } catch (err) {
        console.log(err)
      }
    },
    handleImageUpload(event) {
      this.image = event.target.files[0];
    },
    removeImage(chapterIndex, imgIndex) {
      this.editedAuthor.chapters[chapterIndex].images.splice(imgIndex, 1);
    },
  },
  components: {
    'router-link': RouterLink
  }
};
</script>

<style scoped>
.thietbi {
  margin-left: 250px;
}

.edit-author {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.author-form .form-group {
  margin-bottom: 20px;
}

.author-form .form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.author-form .btn {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.author-form .btn-primary {
  background-color: #007bff;
  color: #fff;
}

.author-form .btn-primary:hover {
  background-color: #0056b3;
}

.author-books {
  margin-top: 20px;
}

.author-books h2 {
  margin-bottom: 10px;
}

.author-books ul {
  list-style: none;
  padding: 0;
}

.author-books ul li {
  margin-bottom: 10px;
}

.success-message {
  background-color: #28a745;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
}

@media (max-width: 767px) {
  .thietbi {
    margin: 0 auto;
  }
}
</style>

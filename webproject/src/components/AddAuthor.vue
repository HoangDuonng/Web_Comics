<template>
  <div class="thietbi">

  
  <div class="add-author">
    <h1>Thêm tác giả mới</h1>
    <form @submit.prevent="addAuthor" class="add-author-form">
      <div class="form-group">
        <label for="authorCode">Mã tác giả:</label>
        <input
          type="text"
          id="authorCode"
          v-model="authorCode"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="authorName">Tên tác giả:</label>
        <input
          type="text"
          id="authorName"
          v-model="authorName"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="authorBio">Giới thiệu:</label>
        <textarea
          id="authorBio"
          v-model="authorBio"
          class="form-control"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="image">Hình đại diện:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          @change="handleImageChange"
        />
      </div>
      <button type="submit" class="btn btn-primary">Thêm tác giả</button>
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
      <div class="toast-body">Tác giả đã được thêm thành công!</div>
    </div>
  </div>
</div>
</template>

<script>
import AuthenticaionService from '../services/AuthenticaionService';
export default {
  name: "AddAuthor",
  data() {
    return {
      authorCode: "",
      authorName: "",
      authorBio: "",
      image: null,
      showToast: false,
    };
  },
  methods: {
    async addAuthor() {
      const formData = new FormData()
      formData.append('fromName',"Admin")
      formData.append('imageUploads',this.image)
      try{
        const testUpload = [{fromName: "Admin", imageUploads: this.image}]
        const resImage = await AuthenticaionService.uploadImage(formData)
        if(resImage.data.message === "success"){
          const author = {tentacgia: this.authorName, matacgia: this.authorCode, gioithieu: this.authorBio, hinhdaidien: resImage.data.name}
          const resAddAuthor = await AuthenticaionService.addNewAuthor(author)
          if(resAddAuthor.data.message === "success"){
            this.showToast = true
          }
        }
      }catch(err){
        console.log(err)
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
.add-author {
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
.success-message {
  background-color: #28a745;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px; 
}
@media (max-width: 768px) {
  .thietbi {
    margin: 0;
  }
  .add-author {
    padding: 10px;
  }

  .author-form .form-control {
    width: calc(100% - 16px); 
  }

  .author-form .btn {
    width: 100%; 
  }

  .success-message {
    margin-top: 5px; 
  }
}

</style>

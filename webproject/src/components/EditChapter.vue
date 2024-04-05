<template>
  <div class="edit-chapter">
    <h2>Edit Chapter</h2>
    <form @submit.prevent="submitChapter">
      <div>
        <label for="title">Chương :</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div>
        <label for="images">Hình ảnh: </label>
        <input
          type="file"
          id="images"
          ref="imageInput"
          accept="image/*"
          multiple
          @change="handleImageChange"
        />
      </div>
      <div>
        <label>Selected Images:</label>
        <ul>
          <li v-for="(image, index) in dataImages" :key="index">
            <img
              :src="'http://localhost:3000/images/chuongImgs/' + image"
              :alt="lmao"
              style="max-width: 200px; max-height: 200px"
            />
            <button type="button" @click="removeImage(image)">Xóa</button>
          </li>
        </ul>
      </div>
      <button type="submit">Lưu</button>
    </form>
    <div v-if="savedSuccess" class="success-message">
      Lưu thành công!
    </div>
  </div>
</template>
  
  <script>
  import AuthenticaionService from '../services/AuthenticaionService';
  import { RouterLink } from 'vue-router';
export default {
  mounted(){
    this.chapterImages()
  },
  data() {
    return {
      title: "",
      images: [],
      dataImages: [],
      savedSuccess: false,
    };
  },
  methods: {
    async submitChapter() {
      const formData = new FormData();
      formData.append("fromName", "Admin");
      for(let i=0;i<this.images.length;i++){
        formData.append("imageUploads", this.images[i])
      }
      try{
        const resUploadImgs = await AuthenticaionService.uploadChapterImg(formData)
        if(resUploadImgs.data.success === 1){
          const imgs = resUploadImgs.data.Images
          const hinhanh_chuong = {machuong: "", hinhanh: imgs} 
          const resSaveImg = await AuthenticaionService.saveChapterImgToDB(this.$route.params.storyChapterID, hinhanh_chuong)
          if(resSaveImg.data.success === 1){
            this.$router.push({name: "ChapterList", params: {storyid: this.$route.params.storyid}})
          }
          console.log("success")
        }
      }catch(error){
        console.log(error)
      }
      console.log("Form Data:", formData);
    },
    async chapterImages(){
      this.dataImages.splice(0,this.dataImages.length)
      try{
        const res = await AuthenticaionService.getChapterImgs(this.$route.params.storyChapterID)
        if(res.data.dataImg === "no images were found"){
          return
        }else{
          res.data.dataImg.forEach(element => {
            this.dataImages.push(`${element}`)
          });
        }
      }catch(error){
        console.log(error)
      }
    },
    handleImageChange(event) {
      this.images = event.target.files
      console.log(this.images)
    },
    async removeImage(image) {
      try{
        const res = await AuthenticaionService.deleteChapterImgs(this.$route.params.storyChapterID,image)
        if(res.data.success===1){
          console.log("Delete Images successful")
          this.chapterImages()
        }
      }catch(err){
        console.log(err)
      }
    },
  },
  components: {
    'router-link': RouterLink
  }
};
</script>

<style scoped>
.success-message {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border-radius: 5px;
}
.edit-chapter {
  max-width: 600px;
  margin: 0 auto;
}

form {
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="file"],
button {
  display: block;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}

button[type="submit"] {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

button[type="button"] {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

button[type="button"]:hover {
  background-color: #c82333;
}
</style>


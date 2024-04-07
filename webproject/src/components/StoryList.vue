<template>
    <div class="story-list">
      <div class="header">
      <h2>Danh sách truyện</h2>
    </div>
    <div class="story-items">
      <ul>
        <li v-for="(story, index) in stories" :key="index">
          <div class="story-item">
            <img
              :src="'http://localhost:3000/images/' + story.anhbia"
              alt="Ảnh truyện"
              class="story-image"
            />
            <div class="story-details">
              <span class="story-title">{{ story.tentruyen }}</span>
              <span class="story-author">Tác giả: </span>
            </div>
            <div class="story-actions">
              <button @click="addChapter(story._id)">Thêm chương</button>
              <button @click="editStory(story._id)">Sửa</button>
              <button @click="deleteStory(story._id)">Xóa</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    </div>
</template>
  
  <script>
import AuthenticaionService from '../services/AuthenticaionService';

export default {
  mounted(){
    this.getStory()
  },
  data() {
    return {
      stories: [
        {
          matruyen: 26,
          anhbia: "img1.jpg",
          tentruyen: "Tên truyện 1",
          tenphu: "",
          tentacgia: ""
          // description: "Mô tả ngắn về truyện 1",
          // link: "#",
        },
      ],
    };
  },
  methods: {
    async getStory(){
      try{
        const getStories = await AuthenticaionService.showStories()
        for(let i=0;i<getStories.data.length;i++){
          this.stories.push(getStories.data[i])
        }
        console.log(this.stories)
      }catch(err){
        console.log(err)
      }
    },
    editStory(id) {
      // Xử lý sự kiện chỉnh sửa truyện ở đây
      this.$router.push({name: "EditStory", params: {storyid: id}, query: {storyid: id}});
    },
    async deleteStory(id) {
      try{
        const res = await AuthenticaionService.deleteStory(id)
        if(res.data.success === 1){
          this.stories.splice(0,this.stories.length)
          this.getStory()
        }
      }catch(err){
        console.log(err)
      }
    },
    addChapter(id) {
    // Xử lý sự kiện thêm chương ở đây
    // Ví dụ: Chuyển hướng đến trang thêm chương mới
      this.$router.push({name: `ChapterList`, params: {storyid: id}, query: {storyid: id}});
    }
  },
};
</script>
  
<style scoped>
.header {
  margin-bottom: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.story-items {
  width: 100%; /* Đảm bảo danh sách truyện căn giữa */
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.story-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.story-list {
  font-family: Arial, sans-serif;
  margin-left: 250px; /* Điều chỉnh lề trái và lề phải để giao diện trông đẹp hơn */
}

.story-list h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.story-list ul {
  list-style-type: none;
  padding: 0;
}

.story-item {
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
  display: flex;
  align-items: center;
}

.story-image {
  width: 100px; /* Điều chỉnh kích thước ảnh theo ý muốn */
  height: auto;
  margin-right: 20px;
}

.story-details {
  flex-grow: 1;
}

.story-title {
  font-weight: bold;
}

.story-author {
  color: #666;
}
.story-actions button {
  margin-right: 10px; /* Tạo khoảng cách giữa các nút */
}
@media only screen and (max-width: 768px) {
  .story-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .story-image {
    margin-right: 0;
    margin-bottom: 10px;
  }
  .story-list {
  font-family: Arial, sans-serif;
  margin: 0 5% /* Điều chỉnh lề trái và lề phải để giao diện trông đẹp hơn */
}
}
</style>
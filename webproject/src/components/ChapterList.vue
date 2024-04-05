<template>
  <div class="chapter-list">
    <h2>Chapter List</h2>
    <ul>
      <li v-for="chapter in chapters" :key="chapter._id" class="chapter-item">
        <span class="chapter-title">{{ chapter.chuong_ten }}</span>
        <div class="button-group">
          <button @click="showChapter(chapter)" class="edit-button">
            Show
          </button>
          <button @click="editChapter(chapter)" class="edit-button">
            Edit
          </button>
          <button @click="deleteChapter(chapter)" class="delete-button">
            Delete
          </button>
        </div>
      </li>
    </ul>
    <button @click="addChapter" class="add-button">Add New Chapter</button>
  </div>
</template>
  
  <script>
  import {RouterLink} from 'vue-router'
  import AuthenticaionService from '../services/AuthenticaionService';
export default {
  mounted(){
    this.getChapter()
  },
  data() {
    return {
      chapters: [],
    };
  },
  methods: {
    async getChapter(){
      try{
        const resGetChapter = await AuthenticaionService.getStoryChapter(this.$route.params.storyid)
        for(let i=0;i<resGetChapter.data.chapters.length;i++){
          this.chapters.push(resGetChapter.data.chapters[i])
        }
      }catch(error){
        console.log(error)
      }
    },
    showChapter(chapter){
      console.log("success")
    },
    addChapter() {
      this.$router.push({name: 'AddChapter', params: {storyid: this.$route.params.storyid} });
    },
    editChapter(chapter) {
      this.$router.push({name: "EditChapter", params: {storyChapterID: chapter._id, storyid: this.$route.params.storyid }, query: {storyChapterId: chapter._id} });
    },
    async deleteChapter(chapter) {
      try{
        const res = await AuthenticaionService.deleteStoryChapter(chapter._id)
        if(res.data.success === 1){
          this.chapters.splice(0,this.chapters.length)
          this.getChapter()
        }
      }catch(error){
        console.log(error)
      }
    },
  },
  components: {
    'router-link': RouterLink
  }
};
</script>
  
<style scoped>
.chapter-list {
  max-width: 800px;
  margin: 0 auto;
}

.chapter-item {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.chapter-title {
  flex: 1;
}

.button-group {
  margin-left: 10px;
}

.edit-button,
.delete-button,
.add-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.edit-button:hover,
.delete-button:hover,
.add-button:hover {
  background-color: #0056b3;
}
</style>
  
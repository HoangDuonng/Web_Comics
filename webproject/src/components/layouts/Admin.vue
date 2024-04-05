<template>
    <div class="container">
      <!-- Form for adding or editing story -->
      <form @submit.prevent="addOrUpdateStory">
        <!-- Input fields for story title, image link, and description -->
        <div class="form-group">
          <label for="title">Tiêu đề:</label>
          <input type="text" id="title" v-model="newStory.title" required>
        </div>
        <div class="form-group">
          <label for="image">Link ảnh:</label>
          <input type="text" id="image" v-model="newStory.image" required>
        </div>
        <div class="form-group">
          <label for="description">Mô tả:</label>
          <textarea id="description" v-model="newStory.description" required></textarea>
        </div>
        <!-- Input fields for chapter title and content -->
        <div class="form-group">
          <label for="chapterTitle">Tiêu đề Chương:</label>
          <input type="text" id="chapterTitle" v-model="newChapter.title" required>
        </div>
        <div class="form-group">
          <label for="chapterContent">Nội dung Chương:</label>
          <textarea id="chapterContent" v-model="newChapter.content" required></textarea>
        </div>
        <!-- Submit button (label depends on whether it's adding or updating story) -->
        <button type="submit" class="btn">{{ editIndex === -1 ? 'Thêm Truyện' : 'Cập nhật Truyện' }}</button>
      </form>
  
      <!-- Table to display list of stories -->
      <h2 class="mt-4">Danh sách Truyện</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Ảnh</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through stories to display each story -->
          <tr v-for="(story, index) in stories" :key="index">
            <td>{{ story.title }}</td>
            <td><img :src="story.image" alt="Ảnh truyện" style="max-width: 100px;"></td>
            <td>{{ story.description }}</td>
            <!-- Buttons for editing and deleting each story -->
            <td>
              <button @click="editStory(index)" class="btn btn-primary">Chỉnh sửa</button>
              <button @click="confirmDelete(index)" class="btn btn-danger">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        stories: JSON.parse(localStorage.getItem('stories')) || [
          { title: 'Bộ truyện 1', image: 'img/4.jpg', description: 'Mô tả bộ truyện 1', chapters: [] },
          { title: 'Bộ truyện 2', image: 'img/2.jpg', description: 'Mô tả bộ truyện 2', chapters: [] },
          { title: 'Bộ truyện 3', image: 'img/3.jpg', description: 'Mô tả bộ truyện 3', chapters: [] },
          // Add more stories here
        ],
        newStory: {
          title: '',
          image: '',
          description: ''
        },
        newChapter: {
          title: '',
          content: ''
        },
        editIndex: -1
      };
    },
    methods: {
      addOrUpdateStory() {
        if (this.editIndex === -1) {
          this.stories.push({ ...this.newStory, chapters: [this.newChapter] });
        } else {
          this.stories.splice(this.editIndex, 1, { ...this.newStory, chapters: [this.newChapter] });
          this.editIndex = -1;
        }
        // Save story information to localStorage
        localStorage.setItem('stories', JSON.stringify(this.stories));
        this.clearForm();
      },
      editStory(index) {
        this.newStory = { ...this.stories[index] };
        this.editIndex = index;
      },
      deleteStory(index) {
        this.stories.splice(index, 1);
        localStorage.setItem('stories', JSON.stringify(this.stories));
      },
      clearForm() {
        this.newStory = {
          title: '',
          image: '',
          description: ''
        };
      },
      confirmDelete(index) {
        if (confirm("Bạn có chắc muốn xóa truyện không?")) {
          this.deleteStory(index);
        }
      }
    }
  };
  </script>
  
  <style>
  </style>
  
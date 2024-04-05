<template>
  <div class="thietbi">
  <div class="author-page">
    <div class="author-info">
      <div class="author-avatar">
        <img :src="require(`../assets/${author.avatar}`)">
      </div>
      <div class="author-details">
        <h1>{{ author.name }}</h1>
        <p>{{ author.bio }}</p>
      </div>
    </div>
    <div class="author-books">
      <h2>Danh sách truyện của tác giả</h2>
      <ul>
        <li v-for="book in author.books" :key="book.id">
          <router-link :to="'/books/' + book.id">{{ book.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
  
  <script>
export default {
  data() {
    return {
      author: {
        name: "Tên tác giả",
        avatar: '9.jpg',
        bio: "Giới thiệu về tác giả",
        books: [
          { id: 1, title: "Tiêu đề truyện 1" },
          { id: 2, title: "Tiêu đề truyện 2" },
          // Thêm các truyện khác nếu cần
        ],
      },
    };
  },
};
</script>
  
  <style scoped>
.thietbi {
  margin-left: 250px;
}
.author-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.author-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.author-avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.author-details h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.author-books ul {
  list-style: none;
  padding: 0;
}

.author-books ul li {
  margin-bottom: 10px;
}
@media (max-width: 767px) {
  .thietbi {
    margin: 0 auto;
  }
}
</style>
  
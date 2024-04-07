<template>
  <div class="thietbi">
    <div class="author-management">
      <h1>Quản lý tác giả</h1>
      <router-link to="/addauthor" class="btn btn-primary"
        >Thêm tác giả</router-link
      >
      <div class="author-list">
        <div
          v-for="(author, index) in authors"
          :key="index"
          class="author-item"
        >
          <div class="author-info">
            <img
              :src="'http://localhost:3000/images/' + author.hinhdaidien"
              alt="Ảnh Tác giả"
              class="author-image"
            />
            <div>
              <h2>{{ author.tentacgia }}</h2>
              <p>{{ author.gioithieu }}</p>
            </div>
          </div>
          <div class="author-actions">
            <!-- <router-link
              :to="{
                name: 'EditAuthor',
                params: { authorid: author.matacgia },
              }"
              class="edit-button"
            >
              Chỉnh sửa
            </router-link> -->
            <button @click="editAuthor(author.id)" class="btn btn-secondary">
              Chỉnh sửa
            </button>
            <button
              @click="deleteAuthor(author.matacgia)"
              class="btn btn-danger"
            >
              Xóa
            </button>
            <router-link :to="'/author'" class="btn btn-info">Xem</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticaionService from '../services/AuthenticaionService';
export default {
  mounted() {
    this.getAuthor()
  },
  data() {
    return {
      authors: [
    
      ],
    };
  },
  methods: {
    async getAuthor() {
      try {
        const getAuthors = await AuthenticaionService.showAuthors();
        for (let i = 0; i < getAuthors.data.authors.length; i++) {
          this.authors.push(getAuthors.data.authors[i]);
        }
        console.log(this.authors);
      } catch (err) {
        console.log(err);
      }
    },
    editAuthor(authorId) {
      // Chuyển hướng đến trang chỉnh sửa tác giả với ID tương ứng
      this.$router.push({ path: "/authoredit", params: { id: authorId } });
    },
    async deleteAuthor(id) {
      try {
        const res = await AuthenticaionService.deleteAuthor(id);
        this.$router.push("/authorm");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.thietbi {
  margin-left: 250px;
  }
.author-image {
  width: 100px; /* Điều chỉnh kích thước ảnh theo ý muốn */
  height: auto;
  margin-right: 20px;
}
.author-management {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.author-list {
  margin-top: 20px;
}

.author-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.author-info {
  display: flex;
  align-items: center;
}

.author-actions {
  display: flex;
  align-items: center;
}

.author-actions button {
  margin-right: 10px;
}
@media (max-width: 767px) {
  .thietbi {
    margin: 0;
  }
  .author-item {
    flex-direction: column;
    align-items: flex-start;
  }
  .author-management {
    max-width: 100%;
    margin: 0 5%;
    padding: 20px;
  }

  .author-actions {
    margin-top: 10px;
    justify-content: flex-start;
  }
}
</style>
<style scoped>
.thietbi {
  margin-left: 250px;
}
.author-management {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.author-list {
  margin-top: 20px;
}

.author-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.author-info {
  display: flex;
}

.author-actions {
  display: flex;
  align-items: center;
}

.author-actions button {
  margin-right: 10px;
}
@media (max-width: 767px) {
  .thietbi {
    margin: 0;
  }
  .author-item {
    flex-direction: column;
    align-items: flex-start;
  }
  .author-management {
    max-width: 100%;
    margin: 0 5%;
    padding: 20px;
  }

  .author-actions {
    margin-top: 10px;
    justify-content: flex-start;
  }
}
</style>
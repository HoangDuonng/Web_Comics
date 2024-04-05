<template>
  <div class="thietbi">

    <div class="user-list">
      <h1>Danh sách người dùng</h1>
      <ul>
        <li v-for="user in userList" :key="user.id" class="user-item">
          <router-link :to="'/users/' + user.id">{{ user.username }}</router-link>
          <span class="user-email">{{ user.email }}</span>
        <span class="user-email">{{ user.password }}</span>
          <button @click="confirmDelete(user._id)" class="delete-button">
            Xóa
          </button>
          <button @click="editUser(user._id)" class="edit-button">
            Chỉnh sửa
          </button>
          <button @click="confirmDelete(user._id)" class="delete-button">
            Xóa
          </button>
          
        </li>
      </ul>
    </div>
  </div>
</template>
    
  <script>
import AuthenticaionService from "../services/AuthenticaionService";
import { RouterLink } from "vue-router";
export default {
  mounted() {
    this.getUsersData();
  },
  data() {
    return {
      userList: [
        { username: "Người dùng 1", email: "user1@example.com" },
        { username: "Người dùng 2", email: "user2@example.com" },
      ],
    };
  },
  methods: {
    async getUsersData(){
      try{
        const res = await AuthenticaionService.getUsers()
        res.data.datalist.forEach( (element) => this.userList.push(element))
      }catch(error){
        console.log(error)
      }
    },
    async confirmDelete(userId) {
      if (confirm("Bạn có chắc muốn xóa người dùng này?")) {
        try{
          const res = await AuthenticaionService.deleteUser(userId)
          if(res.data.success === 1){
            this.userList.splice(0,this.userList.length)
            this.getUsersData()
          }
          console.log(res.data.success)
        }catch(error){
          console.log(error)
        }
      }
    },
    deleteUser(userId) {
      // Gửi yêu cầu xóa người dùng đến server hoặc Vuex store
      // Sau khi xóa thành công, cập nhật danh sách người dùng
      // this.userList = this.userList.filter((user) => user.id !== userId);
    },
    editUser(userId) {
      this.$router.push({path: "edituser", params: {} });
    },
  },
  components: {
    "router-link": RouterLink,
  },
  components: {
    'router-link': RouterLink
  }
};
</script>
    
  <style>
.thietbi {
  margin-left: 250px;
}
.user-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.user-item {
  position: relative;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative; /* Để có thể căn chỉnh nút xóa */
}

.user-item:hover {
  background-color: #eaeaea;
}

.user-item router-link {
  color: #333;
  font-weight: bold;
  text-decoration: none;
}

.user-email {
  color: #666;
  font-size: 0.8rem;
}

.delete-button {
  position: absolute;
  top: 5px;
  right: 10px;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.edit-button {
  position: absolute;
  top: 5px;
  right: 70px; /* Điều chỉnh khoảng cách với nút xóa */
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
@media only screen and (max-width: 767px) {
  .thietbi {
    margin: 0 auto;
  }
  .user-item {
    padding: 15px;
  }

  .delete-button {
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
  }
  .edit-button {
    top: 50%;
    right: 70px;
    transform: translateY(-50%);
  }
}
</style>
  
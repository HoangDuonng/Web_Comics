<template>
  <div class="thietbi">
    <div class="add-user">
      <h2>Thêm người dùng mới</h2>
      <form @submit.prevent="addUser" class="add-user-form">
        <div class="form-group">
          <label for="username">Tên người dùng:</label>
          <input
            type="text"
            v-model="newUser.username"
            id="username"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            v-model="newUser.email"
            id="email"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="password">Mật khẩu:</label>
          <input
            type="password"
            v-model="newUser.password"
            id="password"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="level">Level:</label>
          <select
            v-model="newUser.level"
            id="level"
            required
            class="form-control"
          >
            <option value=1>Admin</option>
            <option value=0>User</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Thêm người dùng</button>
      </form>
      <div v-if="showSuccessMessage" class="success-message">
        Người dùng {{ newUser.username }} đã được thêm thành công!
      </div>
    </div>
  </div>
</template>
  
  <script>
// import { use } from 'vue/types/umd';
import AuthenticaionService from '../services/AuthenticaionService';

export default {
  data() {
    return {
      newUser: {
        username: "",
        email: "",
        password: "",
        level: "user",
      },
      showSuccessMessage: false,
    };
  },
  methods: {
    async addUser() {
      try{
        const user = this.newUser
        if(user.level === "1"){
          user.level = 1
        }else if(user.level === "0"){
          user.level = 0
        }
        const res = await AuthenticaionService.registerFunc(user)
        if(res.data.success === 1){
          this.showSuccessMessage = true
        }
      }catch(error){
        console.log(error)
      }
    },
  },
};
</script>
  
  <style>
.thietbi {
    margin-left: 250px;
}
.add-user {
  max-width: 400px;
  margin: auto;
}

.add-user h2 {
  text-align: center;
  margin-bottom: 20px;
}

.add-user-form .form-group {
  margin-bottom: 15px;
}

.add-user-form label {
  display: block;
  font-weight: bold;
}

.add-user-form .form-control {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.add-user-form .btn-primary {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.add-user-form .btn-primary:hover {
  background-color: #0056b3;
}

.success-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
}
@media (max-width: 767px) {
    .thietbi{
        margin: 0 auto;
    }
}
</style>
  
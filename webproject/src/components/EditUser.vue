<template>
    <div class="thietbi">
  <div class="edit-user">
    <h2>Chỉnh sửa thông tin người dùng</h2>
    <form @submit.prevent="editUser" class="edit-form">
      <div class="form-group">
        <label for="username">Tên người dùng mới:</label>
        <input
          type="text"
          v-model="editedUser.username"
          id="username"
          required
        />
      </div>
      <div class="form-group">
        <label for="oldPassword">Mật khẩu cũ:</label>
        <input
          type="password"
          v-model="editedUser.oldPassword"
          id="oldPassword"
          required
        />
      </div>
      <div class="form-group">
        <label for="newPassword">Mật khẩu mới:</label>
        <input
          type="password"
          v-model="editedUser.newPassword"
          id="newPassword"
          required
        />
      </div>
      <button type="submit" class="btn-submit">Lưu thay đổi</button>
    </form>
    <div v-if="showSuccessMessage" class="success-message">
      Thông tin người dùng đã được cập nhật thành công!
    </div>
  </div>
</div>
</template>
  
  <script>
export default {
  data() {
    return {
      editedUser: {
        username: "",
        oldPassword: "",
        newPassword: "",
      },
      showSuccessMessage: false,
    };
  },
  methods: {
    editUser() {
      // Xử lý logic để chỉnh sửa thông tin người dùng trong hệ thống
      // Ví dụ: gửi yêu cầu API đến máy chủ để chỉnh sửa thông tin người dùng
      console.log("Chỉnh sửa thông tin người dùng:", this.editedUser);
      // Sau khi chỉnh sửa thành công, hiển thị tin nhắn thành công
      this.showSuccessMessage = true;
      // Đặt lại các trường nhập liệu để chuẩn bị cho việc chỉnh sửa người dùng tiếp theo
      this.editedUser = {
        username: "",
        oldPassword: "",
        newPassword: "",
      };
    },
  },
};
</script>
  
  <style scoped>
.edit-user {
  max-width: 400px;
  margin: 0 auto;
}

.edit-user h2 {
  text-align: center;
  margin-bottom: 20px;
}

.edit-form {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-submit {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #0056b3;
}

.success-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
  color: #155724;
}
.thietbi {
    margin-left: 250px;
}
@media only screen and (max-width: 767px) {
    .thietbi {
        margin: 0 auto;
    }
}
</style>
  
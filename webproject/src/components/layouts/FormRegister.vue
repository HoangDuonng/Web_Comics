<template>
  <div class="form-register">
    <h2 class="text-center">{{ title }}</h2>
    <form ref="registerForm" @submit.prevent="myRegister" @reset="resetForm">
      <div class="form-group">
        <label for="first_name">Tên người dùng</label>
        <input type="text" v-model="formdata.first_name" placeholder="Nhập Tên" class="form-control" name="first_name" id="first_name"/>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="formdata.email" placeholder="Nhập Email" class="form-control" name="email" id="email"/>
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <div class="input-group">
          <input v-if="!showPassword" type="password" v-model="formdata.password" placeholder="Nhập mật khẩu" class="form-control" name="password" id="password"/>
          <input v-else type="text" v-model="formdata.password" placeholder="Nhập mật khẩu" class="form-control" name="password" id="password"/>
          <div class="input-group-append">
            <span class="input-group-text" style="background-color: #fff; border: 1px solid #000;">
              <i class="fa" :class="passwordFieldIcon" @click="togglePasswordVisibility"></i>
            </span>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Đăng ký</button>
      <button type="reset" class="btn btn-success">Làm lại</button>
      <label class="label label-success">{{ message }}</label>
    </form>
    <p>Bạn đã có tài khoản? <router-link to="/login">Đăng nhập ngay!</router-link></p>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import AuthenticaionService from '../../services/AuthenticaionService';
export default {
  name: 'FormRegister',
  data() {
    return {
      title: "Đăng Ký",
      formdata: {
        first_name: '',
        email: '',
        password: ''
      },
      message: "",
      success: 0,
      showPassword: false // Thêm biến showPassword vào data
    };
  },
  methods: {
    register() {
      this.axios.post("http://localhost:8888/form-register", this.formdata)
        .then((response) => {
          if (response.data.success > 0) {
            this.message = "Bạn đã đăng ký thành công";
            this.success = response.data.success;
          } else {
            this.message = "Đăng ký thất bại";
            this.success = response.data.success;
          }
        })
        .catch((error) => {
          console.error("Có lỗi xảy ra khi gửi yêu cầu đăng ký:", error);
          this.message = "Đăng ký thất bại";
          this.success = 0;
        });
    },
    async myRegister(){
      try{
        const newUser = {username: this.formdata.first_name, email: this.formdata.email, password: this.formdata.password, level: 0}
        const res = await AuthenticaionService.registerFunc(newUser)
        this.message = res.data.message
        this.success = res.data.success
      }catch(error){
        console.log(error)
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    resetForm() {
      this.formdata = { 
        first_name: '',
        email: '',
        password: ''
      };
    }
  },
  computed: {
    passwordFieldIcon() {
      return this.showPassword ? 'fa-eye' : 'fa-eye-slash';
    }
  },
  components: {
    'routerLink': RouterLink
  }
};
</script>

<style scoped>
.form-register {
  max-width: 400px;
  margin: 20px auto 0px;
  padding: 20px;
  background-color: #fff;
  border-radius: 50px;
  border: 2px solid #000;
}

.form-group {
  margin-bottom: 10px;
}

.btn {
  margin-bottom: 10px;
}

.btn-primary {
  width: 100%;
  background-color: #000; 
  color: #fff; 
  border: 2px solid #000; 
}

.btn-primary:hover {
  background-color: #333; 
  color: #fff;
}

.btn-success {
  width: 100%;
  background-color: #fff; 
  color: #000; 
  border: 2px solid #000; 
}

.btn-success:hover {
  background-color: #333; 
  color: #fff; 
}
</style>

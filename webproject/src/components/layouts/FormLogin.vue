<template>
  <div class="form-login align-items-center">
    <h2 class="text-center">Đăng Nhập</h2>
    <form @submit.prevent="myLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" placeholder="Nhập email" required>
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <div class="input-group">
          <input v-if="!showPassword" type="password" class="form-control" id="password" v-model="password"
            placeholder="Nhập mật khẩu" required>
          <input v-else type="text" class="form-control" id="password" v-model="password" placeholder="Nhập mật khẩu"
            required>
          <div class="input-group-append">
            <span class="input-group-text">
              <i class="fa" :class="passwordFieldIcon" @click="togglePasswordVisibility"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <input type="checkbox" id="remember" v-model="rememberCredentials">
        <label for="remember">Lưu mật khẩu</label>
      </div>
      <button type="submit" class="btn btn-primary">Đăng nhập</button>
      <!-- <p>Hoặc đăng nhập bằng:</p>
      <button @click="loginGoogle" type="button" class="btn btn-danger"><i class="fab fa-google"></i>oogle</button> -->
      <p>Bạn chưa có tài khoản? <router-link to="/register">Đăng kí ngay!</router-link></p>
    </form>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { EventBus } from '@/event-bus';
import AuthenticaionService from '../../services/AuthenticaionService';
export default {
  name: 'FormLogin',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      rememberCredentials: false, // Thêm thuộc tính này để lưu trạng thái "Lưu thông tin đăng nhập"
    };
  },
  computed: {
    passwordFieldIcon() {
      return this.showPassword ? 'fa-eye' : 'fa-eye-slash';
    }
  },
  created() {
    // Kiểm tra nếu có thông tin đăng nhập được lưu và người dùng đã đăng nhập trước đó
    if (localStorage.getItem('loggedIn') === 'true' && localStorage.getItem('savedEmail')) {
      this.email = localStorage.getItem('savedEmail');
      this.password = localStorage.getItem('savedPassword');
      this.rememberCredentials = true;
    }
  },
  methods: {
    async myLogin() {
      try {
        const userLogin = { email: this.email, password: this.password }
        const res = await AuthenticaionService.loginFunc(userLogin)
        if (res.data.success === 1) {
          localStorage.setItem('loggedIn', 'true');
          EventBus.$emit('userLoggedIn', { isUser: false });
          localStorage.setItem('username', res.data.username);
          EventBus.$emit('loginSuccess', res.data.username);
          if (this.rememberCredentials) {
            localStorage.setItem('savedEmail', this.email);
            localStorage.setItem('savedPassword', this.password);
          } else {
            localStorage.removeItem('savedEmail');
            localStorage.removeItem('savedPassword');
          }
          this.$router.push('/admin');
          } else if (res.data.success === 2) {
            localStorage.setItem('loggedIn', 'true');
            EventBus.$emit('userLoggedIn', { isUser: true });
            this.$emit('loginSuccess');
            localStorage.setItem('username', res.data.username);
            EventBus.$emit('loginSuccess', res.data.username);
            this.$router.push('/home');
          }
      } catch (error) {
        console.log(error)
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  },
  components: {
    'routerLink': RouterLink
  },
};
</script>

<style scoped>
.form-login {
  max-width: 400px;
  margin: 20px auto 0px;
  padding: 20px;
  background-color: #fff;
  /* Đổi màu nền thành trắng */
  border-radius: 50px;
  border: 2px solid #000;
  /* Thêm viền đen */
}

.form-group {
  margin-bottom: 10px;
}

.btn {
  margin-bottom: 10px;
  border: 2px solid #000;
  /* Đổi viền nút thành đen */
  color: #000;
  /* Đổi màu chữ của nút thành đen */
}

.btn-primary {
  width: 100%;
  background-color: #000;
  /* Đổi màu nền nút đăng nhập thành đen */
  color: #fff;
  /* Đổi màu chữ của nút đăng nhập thành trắng */
}

.input-group-text {
  cursor: pointer;
  height: 38px;
  background-color: #fff;
  /* Đổi màu nền của icon mật khẩu thành trắng */
  border: 1px solid #000;
  /* Đổi viền của icon mật khẩu thành đen */
}
</style>

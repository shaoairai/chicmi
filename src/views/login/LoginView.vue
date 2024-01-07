<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    // 登入
    login() {
      let data = {
        "username": import.meta.env.VITE_APP_ACCOUNT,
        "password": import.meta.env.VITE_APP_PW,
      }
      const conf = {
        method: 'POST',
        url: `${import.meta.env.VITE_APP_URL}v2/admin/signin`,
        data: data,
      }
      axios(conf).then((res) => {
        console.log(res);

        // 取出 token 和 expired
        const { token, expired } = res.data;

        // 存放到 cookie，expired 轉成時間格式
        document.cookie = `token=${token};expires=${new Date(expired)}`;

        // 轉址
        this.$router.push('/home')

      }).catch((err) => {
        console.log(err.response);
      })
    },
  },
  mounted() {
    this.login();
  }
}
</script>

<template>
  <div>
    <!-- <form>
      <div>帳號：</div>
      <input type="text" id="account" v-model="username" />
      <div>密碼：</div>
      <input type="password" id="password" v-model="password" />
      <button type="button" class="btn btn-primary" @click="login()">登入</button>
    </form> -->
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";
</style>
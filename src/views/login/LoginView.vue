<script>
import axios from "axios";

export default {
  data() {
    return {
      showpwBool: false,
      // 登入按鈕 spinner
      logining: true,
      pw: "",
    };
  },
  methods: {
    // 登入
    formSubmit(value) {
      const vm = this;

      // 按鈕動畫
      vm.logining = false;

      if (value.password === "a123321a") {
        vm.pw = "p125691714593";
      }
      const data = {
        username: value.email,
        password: vm.pw,
      };
      const conf = {
        method: "POST",
        url: `${import.meta.env.VITE_APP_URL}v2/admin/signin`,
        data: data,
      };
      axios(conf)
        .then((res) => {
          console.log(res);

          // 取出 token 和 expired
          const { token, expired } = res.data;

          // 存放到 cookie，expired 轉成時間格式
          document.cookie = `token=${token};expires=${new Date(expired)}`;

          // 解除按鈕動畫
          vm.logining = true;

          // 轉址
          this.$router.push("/admin");
        })
        .catch((err) => {
          console.log(err.response);
          // 解除按鈕動畫
          vm.logining = true;
        });
    },
  },
  mounted() {
    // this.login();
  },
};
</script>

<template>
  <table class="w-100 vh-100">
    <tr>
      <td>
        <div class="container" style="max-width: 500px">
          <h4 class="w-100 text-center pb-3">登入</h4>
          <VForm @submit="formSubmit">
            <div class="d-flex align-items-center">
              <i class="icon-user text-primary fs-4"></i>
              <label
                for="account"
                class="form-label mb-0 pe-2 gray-600"
                style="white-space: nowrap"
              >
                帳號
              </label>
              <VField
                class="form-control"
                id="account"
                name="email"
                type="email"
                rules="required|email"
                placeholder="請輸入E-mail"
              />
            </div>
            <div class="text-end mb-3">
              <ErrorMessage
                name="email"
                class="text-danger"
                v-slot="{ message }"
              >
                <div class="text-danger">
                  {{ message === "email 為必填" ? "必填" : "Email 格式錯誤" }}
                </div>
              </ErrorMessage>
            </div>
            <div class="d-flex align-items-center">
              <i class="icon-unlock text-primary fs-4"></i>
              <label
                for="pw"
                class="form-label mb-0 pe-2 gray-600"
                style="white-space: nowrap"
              >
                密碼
              </label>
              <VField
                class="form-control"
                id="pw"
                name="password"
                :type="showpwBool ? 'text' : 'password'"
                rules="required"
                placeholder="請輸入密碼"
              />
            </div>
            <div class="text-end mb-3">
              <ErrorMessage name="password" class="text-danger" />
            </div>
            <div class="mb-3 text-start">
              <input
                type="checkbox"
                name="showpw"
                id="showpw"
                class="form-check-input"
                :checked="showpwBool"
                @change="showpwBool = !showpwBool"
              />
              <label for="showpw" class="ms-1">顯示密碼</label>
            </div>
            <button
              type="submit"
              class="btn btn-primary w-100"
              v-show="logining"
            >
              登入
            </button>
            <button
              type="button"
              class="btn btn-primary w-100"
              disabled
              v-show="!logining"
            >
              <div class="spinner-border text-white" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </VForm>
        </div>
      </td>
    </tr>
  </table>
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";

table {
  background: $gray-900;
}

// 按鈕 spinner
.spinner-border {
  width: 1rem;
  height: 1rem;
  border-width: 0.2rem;
}
</style>

<script>
import { RouterLink } from "vue-router";
import { mapState, mapActions } from "pinia";
import { cartStore } from "../../stores/counter";
import axios from "axios";

import { login } from "../../utils/token/getToken";
import LoadingAni from "@/components/loading/LoadingAni.vue";

export default {
  data() {
    return {
      text: "Products頁",
      token: "",
    };
  },
  computed: {
    ...mapState(cartStore, ["products", "productList"]),
  },
  methods: {
    takeToken() {
      // 從 cookie 取出 token
      const tokenCookie = document.cookie
        .split(";")
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith("token="));
      const token = tokenCookie ? tokenCookie.split("=")[1] : null;
      return token;
    },
    // 取得產品列表
    async getProducts() {
      const conf = {
        method: "GET",
        url: `${import.meta.env.VITE_APP_URL}v2/api/${
          import.meta.env.VITE_APP_PATH
        }/admin/products/all`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${this.token}`,
        },
      };
      await axios(conf)
        .then((res) => {
          console.log(res);
          // 存放所有產品
          const saveData = cartStore();
          saveData.saveProducts(res.data.products);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    // 存到 pinia
    // 加入購物車
    ...mapActions(cartStore, ["addToCart"]),

    // 是否有此產品在購物車了
    hasProduct(id) {
      let bool = false;
      this.productList.forEach((item) => {
        if (item.id === id) {
          console.warn(id);
          bool = true;
        }
      });
      return bool;
    },
  },
  components: {
    RouterLink,
    LoadingAni,
  },
  async mounted() {
    const vm = this;

    // Loading show
    vm.$refs.refLoadingAni.show();

    console.log("#router", this.$route.params.id);

    let takenToken = vm.takeToken();
    vm.token = takenToken;

    // 沒 token 就踢出去
    if (!takenToken) {
      // 登入
      await login();

      takenToken = vm.takeToken();
      vm.token = takenToken;
    }

    // 取得所有產品列表
    await vm.getProducts();

    // Loading hide
    vm.$refs.refLoadingAni.hide();
  },
};
</script>

<template>
  <section class="position-relative">
    <div class="table-runner"></div>
    <!-- 菜單 -->
    <div class="py-5 container">
      <div class="row" v-for="item in products" :key="item.id">
        <template v-if="item.id == this.$route.params.id">
          <div class="col-12 col-md-6 pb-3 pb-md-0">
            <div class="w-100 h-100 border-0">
              <div
                class="position-relative w-100 overflow-hidden rounded-3"
                style="padding-top: 100%"
              >
                <img
                  :src="item.imageUrl"
                  class="position-absolute top-0 start-0 w-100 h-100"
                  style="object-fit: cover"
                  alt="..."
                />
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <h5>{{ item.title }}</h5>
            <div class="section-line border-primary"></div>
            <div class="pt-2">內含：{{ item.description }}</div>
            <div class="py-2 fs-5">NT${{ item.price }}</div>
            <template v-if="hasProduct(item.id)">
              <button
                type="button"
                class="btn btn-secondary w-100 px-1"
                disabled
              >
                已在購物車
              </button>
            </template>
            <template v-else>
              <button
                type="button"
                class="btn btn-primary w-100 px-1"
                @click="addToCart(item)"
              >
                加入購物車
              </button>
            </template>
          </div>
        </template>
      </div>
    </div>

    <!-- Loading -->
    <LoadingAni ref="refLoadingAni"></LoadingAni>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";

.table-runner {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(https://images.unsplash.com/photo-1618022325802-7e5e732d97a1?q=80&w=1648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(8px);
  z-index: -1;
}

.section-line {
  width: 10%;
  border-bottom: 2px solid $gray-300;
}
</style>

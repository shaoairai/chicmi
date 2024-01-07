<script>
import { RouterLink, RouterView } from "vue-router";
import WebFooter from "@/components/WebFooter.vue";

import { mapState } from "pinia";
import { cartStore } from "@/stores/counter.js";

console.log(import.meta.env.VITE_APP_URL);

export default {
  components: {
    RouterLink,
    RouterView,
    WebFooter,
  },
  computed: {
    ...mapState(cartStore, ["productList"]),
  },
  mounted() {
    // 取得 localStorage 有無暫存列表
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart != null) {
      // 1. 宣告
      const cartStoreFunc = cartStore();
      // 2. 直接呼叫 pinia 函式，並帶參數
      cartStoreFunc.setProductList(storedCart);
    }
  },
};
</script>

<template>
  <!-- 導覽列 -->
  <nav class="navbar bg-dark py-4">
    <div class="container d-flex flex-column">
      <div>
        <RouterLink to="/home" class="text-decoration-none">
          <span
            class="navbar-brand text-primary fw-bold"
            style="font-size: 28px"
          >
            吃迷 CHIC MI
          </span>
        </RouterLink>
      </div>
      <div class="justify-content-end pt-3" id="navbarNavAltMarkup">
        <div>
          <RouterLink to="/about" class="text-decoration-none"
            ><span class="text-white me-3">品牌故事</span>
          </RouterLink>
          <RouterLink to="/products" class="text-decoration-none"
            ><span class="text-white me-3">線上點餐</span>
          </RouterLink>
          <RouterLink to="/contact" class="text-decoration-none"
            ><span class="text-white me-3">聯絡我們</span>
          </RouterLink>
          <RouterLink to="/cart" class="text-decoration-none"
            ><span class="text-white"
              ><i class="bi bi-cart-fill"></i>
              <span>
                {{ productList.length }}
              </span>
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>

  <RouterView style="padding-top: 130px" />

  <WebFooter />
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  box-shadow: 0px 2px 2px #0000004f;
}
</style>

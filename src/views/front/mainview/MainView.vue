<script>
import { RouterLink, RouterView } from "vue-router";
import WebFooter from "@/components/footer/WebFooter.vue";

import { storeToRefs, mapState } from "pinia";
import { cartStore } from "@/stores/counter.js";

// console.log(import.meta.env.VITE_APP_URL);

export default {
  data() {
    return {
      productList: [],
    };
  },
  components: {
    RouterLink,
    RouterView,
    WebFooter,
  },
  mounted() {
    const store = cartStore();
    const { productList } = storeToRefs(store);
    // console.log("productList");
    // console.log(productList);
    this.productList = productList;

    const vm = this;
    this.$nextTick(async () => {
      // 使用 Promise 解決 localStorage 異步操作
      const storedCart = await new Promise((resolve) => {
        const data = localStorage.getItem("cart");
        resolve(JSON.parse(data));
      });

      if (storedCart != null) {
        // console.log("有存入");
        // console.log(storedCart);
        const cartStoreFunc = cartStore();
        cartStoreFunc.setProductList([...storedCart]);
      }
    });
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
            吃迷 <span class="en">CHIC MI</span>
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
              <span class="ps-1">
                {{ productList.length }}
                <!-- <span class="d-none">{{ productList }}</span> -->
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

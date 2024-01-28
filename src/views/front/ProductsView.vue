<script>
import { RouterLink } from "vue-router";
import axios from "axios";
import { mapActions, mapState } from "pinia";
import { cartStore } from "../../stores/counter";
import { login } from "../../utils/token/getToken";

import LoadingAni from "@/components/loading/LoadingAni.vue";

export default {
  data() {
    return {
      token: "",
      // 分類
      categories: [],
      // 分類產品
      cateProducts: {},

      mouseX: 0,
      mouseY: 0,
      elementCenterX: 0,
      elementCenterY: 0,
      showCircle: false, // 控制圓形顯示與否
    };
  },
  components: {
    RouterLink,
    LoadingAni,
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
      const vm = this;

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

          // 篩選狀態為全部
          vm.cateProducts = res.data.products;
          // console.log(this.products);
          vm.getCategories();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    // 取得所有分類
    getCategories() {
      const categoriesArr = new Set();
      Object.keys(this.products).forEach((key) => {
        const value = this.products[key];
        categoriesArr.add(value.category);
      });
      this.categories = categoriesArr;
    },
    // 按下分類按鈕後，只顯示該分類產品
    getCateProducts(category) {
      console.log(category);
      if (category) {
        // 有要篩選
        const cateProducts = {};
        Object.keys(this.products).forEach((key) => {
          const product = this.products[key];
          if (product.category === category) {
            cateProducts[key] = product;
          }
        });
        this.cateProducts = cateProducts;
      } else {
        // 全部
        this.cateProducts = this.products;
      }
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
    // 加入購物車動畫
    addAni(e) {
      const vm = this;

      // 獲取滑鼠位置
      vm.mouseX = e.clientX;
      vm.mouseY = e.clientY;

      // 目標位置
      const elementA = document.querySelector(".bi-cart-fill");
      const elementRect = elementA.getBoundingClientRect();
      vm.elementCenterX = elementRect.left + elementRect.width / 2;
      vm.elementCenterY = elementRect.top + elementRect.height / 2;

      // // 啟動動畫
      // vm.showCircle = true;
      // setTimeout(() => {
      //   vm.showCircle = false;
      // }, 1000);
    },
  },
  computed: {
    ...mapState(cartStore, ["productList", "products"]),
  },
  async mounted() {
    const vm = this;

    // Loading show
    vm.$refs.refLoadingAni.show();

    let takenToken = vm.takeToken();
    vm.token = takenToken;

    // 沒 token 就踢出去
    if (!takenToken) {
      // 登入
      await login();

      takenToken = vm.takeToken();
      vm.token = takenToken;
    }

    await vm.getProducts();

    // Loading hide
    vm.$refs.refLoadingAni.hide();
  },
};
</script>

<template>
  <section>
    <!-- 分類 -->
    <div class="section-line container d-flex justify-content-center">
      <div class="pt-5 pb-3">
        <button
          type="button"
          class="btn btn-primary m-2"
          @click="getCateProducts()"
        >
          全部
        </button>
        <button
          type="button"
          class="btn btn-primary m-2"
          v-for="(category, i) in categories"
          :key="i"
          @click="getCateProducts(category)"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- 菜單 -->
    <div class="py-5 container">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" v-for="product in cateProducts" :key="product.id">
          <div class="card h-100 border-0">
            <img
              :src="product.imageUrl"
              class="rounded-3"
              :alt="product.title"
              style="height: 300px; object-fit: cover"
            />
            <div class="d-flex justify-content-between pt-2">
              <h5>{{ product.title }}</h5>
              <div>NT$ {{ product.price }}</div>
            </div>
            <div class="row d-flex flex-column flex-md-row g-0">
              <div class="col col-md-6 pe-0 pe-md-1">
                <RouterLink :to="'/product/' + product.id">
                  <button type="button" class="btn btn-primary w-100">
                    查看內容
                  </button>
                </RouterLink>
              </div>
              <div class="col col-md-6 ps-0 ps-md-1 pt-1 pt-md-0">
                <template v-if="hasProduct(product.id)">
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
                    @click="addToCart(product), addAni($event)"
                  >
                    加入購物車
                  </button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加入購物車動畫 -->
    <!-- <div
      class="moving-circle"
      :style="{ top: elementCenterY + 'px', left: elementCenterX + 'px' }"
    ></div> -->

    <!-- Loading -->
    <LoadingAni ref="refLoadingAni"></LoadingAni>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";

.section-line {
  border-bottom: 2px solid $primary;
}

/* 定義移動的圓形的樣式 */
.moving-circle {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: $primary; /* 選擇您想要的顏色 */
  z-index: 99999;
  transition: all 1s ease; /* 定義動畫效果，1秒內完成，使用ease函數 */
}
</style>

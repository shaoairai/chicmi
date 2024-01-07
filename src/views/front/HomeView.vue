<script>
import banner from "/img/banner.jpg";
import axios from "axios";
import { mapActions, mapState } from "pinia";
import { cartStore } from "../../stores/counter";
import { RouterLink } from "vue-router";
import { login } from "../../utils/token/getToken";
import AboutusView from "@/components/homeview/AboutusView.vue";
import NumberView from "@/components/homeview/NumberView.vue";
import SloganView from "@/components/homeview/SloganView.vue";
import NewsView from "@/components/homeview/NewsView.vue";
import InfoView from "@/components/homeview/InfoView.vue";
// import { gsap } from 'gsap';

export default {
  data() {
    return {
      token: "",
      text: "首頁",
      imgUrl: banner,
    };
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
    getProducts() {
      console.log("取得產品列表");
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
      axios(conf)
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
  computed: {
    ...mapState(cartStore, ["productList", "products"]),
  },
  components: {
    RouterLink,
    AboutusView,
    NumberView,
    SloganView,
    NewsView,
    InfoView,
  },
  async mounted() {
    let takenToken = this.takeToken();
    this.token = takenToken;

    // 沒 token 就踢出去
    if (!takenToken) {
      // console.log("開始登入");
      // 登入
      await login();
      // console.log("完成登入");

      takenToken = this.takeToken();
      this.token = takenToken;
    }

    this.getProducts();
  },
};
</script>

<template>
  <div class="content">
    <!-- banner 背景 -->
    <section
      class="banner-outer position-relative"
      style="height: calc(100vh - 130px)"
    >
      <div
        class="banner-bg mx-auto"
        style="width: calc(100% - 80px)"
        :style="{ backgroundImage: 'url(' + imgUrl + ')' }"
      ></div>
      <div class="banner position-absolute top-0 left-0 w-100">
        <div class="banner-text w-100 d-flex align-items-center container">
          <div class="text-white d-flex flex-column mb-5 ms-5">
            <h2 class="fs-1 mb-4">Chic Mi Brunch</h2>
            <h3 class="fs-4">The best of the day.</h3>
          </div>
        </div>
      </div>
    </section>
    <!-- 關於 -->
    <AboutusView></AboutusView>
    <!-- 數字 -->
    <NumberView></NumberView>
    <!-- 過場 -->
    <SloganView></SloganView>
    <!-- 精選熱銷 -->
    <section class="table-runner">
      <div class="py-5 container">
        <h3 class="text-start py-5 text-center">精選熱銷 | Top 3</h3>
        <div class="row row-cols-1 row-cols-lg-3 g-4">
          <template v-for="(item, key, index) in products" :key="item.id">
            <div class="col" v-if="index > 0 && index < 4">
              <div class="card h-100 border-0" style="background: unset">
                <img
                  :src="item.imageUrl"
                  class="rounded-3"
                  alt="..."
                  style="height: 300px; object-fit: cover"
                />
                <div class="d-flex justify-content-between pt-2 text-white">
                  <h5>{{ item.title }}</h5>
                  <div>NT${{ item.price }}</div>
                </div>
                <div class="row d-flex flex-column flex-md-row g-0">
                  <div class="col col-md-6 pe-0 pe-md-1">
                    <RouterLink :to="'/product/' + item.id">
                      <button type="button" class="btn btn-primary w-100">
                        查看內容
                      </button>
                    </RouterLink>
                  </div>
                  <div class="col col-md-6 ps-0 ps-md-1 pt-1 pt-md-0">
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
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>
    <!-- 最新消息 -->
    <NewsView></NewsView>
    <!-- 營業資訊 -->
    <InfoView></InfoView>
  </div>
</template>

<style lang="scss" scoped>
.content {
  width: 100%;
}

.banner-bg {
  height: calc(100vh - 180px);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.banner,
.banner-text {
  height: calc(100vh - 130px);
}

// .table-runner {
//   background: url("/src/assets/img/table-runner.jpg");
//   background-repeat: no-repeat;
//   background-position: center;
//   background-size: cover;
// }

@media screen and (max-width: 768px) {
  .banner,
  .banner-text,
  .banner-bg {
    height: calc(50vh - 66px);
  }
}
</style>

<script>
import banner from "@/assets/img/brand_bg.jpg";
// import banner from "/img/banner.jpg";
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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingAni from "@/components/loading/LoadingAni.vue";

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
    async getProducts() {
      const vm = this;
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
      await axios(conf)
        .then((res) => {
          console.log(res);
          // 存放所有產品
          const saveData = cartStore();
          saveData.saveProducts(res.data.products);

          // 取完資料，再執行 gsap 設定
          setTimeout(function () {
            // vm.gsapFeature();
            // 取好資料後再執行，避免因為產品還沒放而跑版
            // vm.$refs.newsRef.gsapSwiper();
            // vm.$refs.infoRef.gsapInfo();
          }, 2000);
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
    // gsap
    gsapBanner(tl) {
      gsap.to(".banner-bg", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ".banner-bg",
          start: "top 40%",
          end: "bottom top",
          scrub: true,
          // markers: true,
        },
      });
      // tl.from(".banner-outer", {
      //   y: 50,
      //   duration: 1.5,
      //   opacity: 0,
      //   delay: 1,
      // });
      // tl.to(".gsap-banner-bg", {
      //   opacity: 0,
      //   y: "-10%",
      //   scrollTrigger: {
      //     trigger: ".gsap-banner-bg",
      //     start: "80% 75%",
      //     end: "80% top",
      //     scrub: true,
      //   },
      // });
      // tl.to(".banner-bg", {
      //   width: "100%",
      //   scrollTrigger: {
      //     trigger: ".banner-bg",
      //     start: "80% 75%",
      //     end: "80% top",
      //     scrub: true,
      //   },
      // });
    },
    gsapFeature() {
      gsap.utils.toArray(".card").forEach((item, i) => {
        gsap.from(item, {
          y: 100,
          duration: 1,
          // ease: Power2.inOut,
          delay: i * 0.3, // 這樣就能依順序
          opacity: 0,
          scrollTrigger: {
            trigger: ".feature",
            start: "center 65%",
            end: "center 65%",
            toggleActions: "restart none reverse none",
            // markers: true,
          },
        });
      });
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
    LoadingAni,
  },
  async mounted() {
    const vm = this;

    // Loading show
    vm.$refs.refLoadingAni.show();

    let takenToken = vm.takeToken();
    vm.token = takenToken;

    // 沒 token 就踢出去
    if (!takenToken) {
      // console.log("開始登入");
      // 登入
      await login();
      // console.log("完成登入");

      takenToken = vm.takeToken();
      vm.token = takenToken;
    }

    // 取資料
    await vm.getProducts();

    // gsap setting
    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline({});

    vm.gsapBanner(tl);

    // Loading hide
    vm.$refs.refLoadingAni.hide();
  },
  beforeUnmount() {
    // console.warn("全部銷毀");
    // ScrollTrigger.killAll();
    // const elementsToKill = [
    //   "#div1_text",
    //   "#img1",
    //   "#div2_text",
    //   "#img2",
    //   "#div2_text2",
    //   "#light2_2",
    //   "#div3_text",
    //   "#img3",
    //   "#light1",
    //   "#light2",
    //   "#light3",
    // ];
    // elementsToKill.forEach((elementSelector) => {
    //   gsap.killTweensOf(elementSelector);
    // });
  },
};
</script>

<template>
  <div class="content">
    <!-- banner 背景 -->
    <section
      class="banner-outer position-relative"
      style="height: calc(100vh - 130px); overflow: hidden"
    >
      <!-- <img
        id="parallax-image"
        class="w-100"
        :src="imgUrl"
        alt="Parallax Image"
      /> -->
      <div class="gsap-banner-bg">
        <div
          class="banner-bg mx-auto"
          style="filter: brightness(20%)"
          :style="{ backgroundImage: 'url(' + imgUrl + ')' }"
        ></div>
        <div class="banner position-absolute top-0 left-0 w-100">
          <div
            class="banner-text w-100 d-flex align-items-center justify-content-center container"
          >
            <div class="text-white d-flex flex-column mb-5 ms-5 text-center">
              <h2 class="mb-4 en" style="font-size: 58px">Tasty Excellence</h2>
              <h3 class="fs-4 en">The Best Feasting Experience</h3>
            </div>
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
      <div class="pt-5 container" style="padding-bottom: 120px">
        <h3 class="feature text-start py-5 text-center">
          精選熱銷 | <span class="en">Top 3</span>
        </h3>
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
    <NewsView ref="newsRef"></NewsView>
    <!-- 營業資訊 -->
    <InfoView ref="infoRef"></InfoView>
  </div>

  <!-- Loading -->
  <LoadingAni ref="refLoadingAni"></LoadingAni>
</template>

<style lang="scss" scoped>
.content {
  width: 100%;
}

.banner-bg {
  height: calc(100vh + 120px);
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
    height: calc(100vh + 120px);
  }
}
</style>

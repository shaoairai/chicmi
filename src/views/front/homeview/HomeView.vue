<script>
import banner from "@/assets/img/brand_bg.jpg";
// import banner from "/img/banner.jpg";
import axios from "axios";
import { mapActions, mapState, storeToRefs } from "pinia";
import { cartStore } from "@/stores/counter";
import { RouterLink } from "vue-router";
import { login, getTokenFromCookie } from "@/utils/token/getToken";
import AboutusView from "@/views/front/homeview/el/AboutusView.vue";
import NumberView from "@/views/front/homeview/el/NumberView.vue";
import SloganView from "@/views/front/homeview/el/SloganView.vue";
import NewsView from "@/views/front/homeview/el/NewsView.vue";
import InfoView from "@/views/front/homeview/el/InfoView.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingAni from "@/components/loading/LoadingAni.vue";

export default {
  data() {
    return {
      token: "",
      text: "首頁",
      imgUrl: banner,

      // pinia data
      productList: [],
      products: [],
    };
  },
  methods: {
    // 取得產品列表
    async getProducts() {
      const vm = this;
      // console.log("取得產品列表");
      const conf = {
        method: "GET",
        url: `${import.meta.env.VITE_APP_URL}v2/api/${
          import.meta.env.VITE_APP_PATH
        }/admin/products/all`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios(conf)
        .then((res) => {
          // console.log(res);
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
    // gsap
    gsapBanner(tl) {
      // 滾動視差
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

      tl.fromTo(
        "#title",
        {
          yPercent: 50,
          delay: 1.2,
          duration: 1,
          opacity: 0,
        },
        {
          yPercent: 0,
          delay: 1.2,
          duration: 1,
          opacity: 1,
        }
      );
      tl.fromTo(
        "#subtitle",
        {
          yPercent: 50,
          duration: 1,
          opacity: 0,
          delay: 0.5,
        },
        {
          yPercent: 0,
          duration: 1,
          opacity: 1,
          delay: 0.5,
        },
        "<"
      );
    },
    gsapFeature() {
      this.$nextTick(() => {
        gsap.utils.toArray(".card").forEach((item, i) => {
          gsap.fromTo(
            item,
            {
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
            },
            {
              y: 0,
              duration: 1,
              // ease: Power2.inOut,
              delay: i * 0.3, // 這樣就能依順序
              opacity: 1,
              scrollTrigger: {
                trigger: ".feature",
                start: "center 65%",
                end: "center 65%",
                toggleActions: "restart none reverse none",
                // markers: true,
              },
            }
          );
        });
      });
    },
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

    const takenToken = getTokenFromCookie();
    if (!takenToken) {
      await login();
    }

    // 取資料
    await vm.getProducts();

    // pinia 放入此頁面變數
    const store = cartStore(); // 取得該 Store
    const { products, productList } = storeToRefs(store); // 使用 storeToRefs(store)
    // 存入該頁變數
    vm.products = products;
    vm.productList = productList;

    // gsap setting
    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline({});

    vm.gsapBanner(tl);
    vm.gsapFeature();

    // Loading hide
    vm.$refs.refLoadingAni.hide();
  },
  beforeUnmount() {
    console.warn("Home銷毀");
    ScrollTrigger.killAll();
    const elementsToKill = [".banner-bg", "#title", "#subtitle", ".card"];
    elementsToKill.forEach((elementSelector) => {
      gsap.killTweensOf(elementSelector);
    });
  },
};
</script>

<template>
  <div class="content">
    <!-- banner 背景 -->
    <section
      class="banner-outer position-relative"
      style="height: calc(100vh - 130px); margin-top: 130px; overflow: hidden"
    >
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
            <div class="text-white d-flex flex-column mb-5 text-center">
              <h2
                id="title"
                class="mb-4 en"
                style="font-size: 58px; opacity: 1"
              >
                Tasty Excellence
              </h2>
              <h3 id="subtitle" class="fs-4 en" style="opacity: 1">
                The Best Feasting Experience
              </h3>
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
    <section>
      <div class="position-relative overflow-hidden">
        <div class="table-runner"></div>
        <div class="pt-5 container" style="padding-bottom: 120px">
          <h3 class="feature text-start py-5 text-center">
            精選熱銷 | <span class="en">Top 3</span>
          </h3>
          <div class="row row-cols-1 row-cols-lg-3 g-4">
            <template v-for="(item, key, index) in products" :key="item.id">
              <div class="col" v-if="index > 0 && index < 4">
                <div
                  class="card h-100 border-0"
                  style="background: unset; opacity: 1"
                >
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

@media screen and (max-width: 768px) {
  .banner,
  .banner-bg {
    height: calc(100vh + 120px);
  }
}
</style>

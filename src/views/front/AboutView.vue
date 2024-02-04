<script>
import brandBg from "@/assets/img/brand_bg.jpg";
import waiterBg from "@/assets/img/waiter.jpg";
import glassBg from "@/assets/img/glassBg.jpg";
import FeatureView from "@/components/aboutview/FeatureView.vue";
import LoadingAni from "@/components/loading/LoadingAni.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  data() {
    return {
      text: "About頁",
      brandImgUrl: brandBg,
      waiterBgUrl: waiterBg,
      glassBgUrl: glassBg,
      titleBg:
        "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",

      scrollTriggerSet1: {
        trigger: "#div1_text",
        start: "top 75%",
        end: "top 75%",
        // markers: true,
      },

      scrollTriggerSet2: {
        trigger: "#div2_text",
        start: "top 75%",
        end: "top 75%",
        // markers: true,
      },
    };
  },
  methods: {
    gsapArea(tl) {
      const vm = this;
      ScrollTrigger.defaults({
        toggleActions: "restart none reverse none",
      });

      gsap.from("#story-title1", {
        y: "50px",
        opacity: 0,
        ease: "power2.out",
        duration: 1,
        scrollTrigger: vm.scrollTriggerSet1,
      });
      gsap.from("#story-content1", {
        y: "50px",
        opacity: 0,
        ease: "power2.out",
        duration: 1,
        delay: 0.5,
        scrollTrigger: vm.scrollTriggerSet1,
      });
      gsap.from(".story-img-1", {
        y: "50px",
        opacity: 0,
        ease: "power2.out",
        duration: 1,
        delay: 1,
        scrollTrigger: vm.scrollTriggerSet1,
      });

      gsap.from("#story-title2", {
        y: "50px",
        opacity: 0,
        ease: "power2.out",
        duration: 1,
        scrollTrigger: vm.scrollTriggerSet2,
      });
      gsap.from("#story-content2", {
        y: "50px",
        opacity: 0,
        ease: "power2.out",
        duration: 1,
        delay: 0.5,
        scrollTrigger: vm.scrollTriggerSet2,
      });
      gsap.from(".story-img-2", {
        y: "50px",
        opacity: 0,
        ease: "power2.out",
        duration: 1,
        delay: 1,
        scrollTrigger: vm.scrollTriggerSet2,
      });
    },
  },
  components: {
    FeatureView,
    LoadingAni,
  },
  mounted() {
    const vm = this;

    // Loading show
    vm.$refs.refLoadingAni.show();

    // gsap setting
    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline({});

    vm.gsapArea(tl);

    // Loading hide
    vm.$refs.refLoadingAni.hide();
  },
  beforeUnmount() {
    // alert("kill");
    ScrollTrigger.killAll();
    const elementsToKill = [
      "#story-title1",
      "#story-content1",
      ".story-img-1",
      "#story-title2",
      "#story-content2",
      ".story-img-2",
    ];
    elementsToKill.forEach((elementSelector) => {
      gsap.killTweensOf(elementSelector);
    });
  },
};
</script>

<template>
  <section>
    <!-- 圖片 -->
    <div class="position-relative">
      <img
        class="bg-material position-absolute top-0 left-0 w-100 h-100"
        src="https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="材質背景"
      />
      <div class="position-relative" style="height: 200px">
        <div
          class="titleArea"
          :style="{ 'background-image': 'url(' + titleBg + ')' }"
        ></div>
        <div
          class="fs-2 text-white position-absolute translate-middle start-50 top-50"
        >
          品牌故事
        </div>
      </div>
      <div class="container" style="padding: 120px 20px 60px 20px">
        <div class="row d-flex align-items-center">
          <div id="div1_text" class="col-12 col-md-6 pe-md-5 pe-0">
            <h2
              id="story-title1"
              class="brLineAfter pb-3 position-relative d-inline-block"
            >
              品牌背景
            </h2>
            <div id="story-content1" class="pt-3">
              <p>
                「吃迷」寓意著對美食的執著與探索，每一位品味者都像是一位迷人的探險家，在這個美食的世界中尋找屬於自己的味覺寶藏。這個品牌背後的故事，正是一場尋味的冒險，一段濃縮了獨到眼光與品味的旅程。
              </p>
              <p>
                「吃迷」誕生的初衷，是將飲食視為一場藝術，每一道菜都是大師們精心策劃的藝術品，呈現的不僅僅是美味，更是一場感官的盛宴。
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6 px-1">
            <div class="story-img-1 rounded-3 overflow-hidden p-0 shadow-lg">
              <img :src="brandImgUrl" alt="" class="w-100" />
            </div>
          </div>
        </div>
      </div>
      <div class="container" style="padding: 60px 20px 120px 20px">
        <div
          class="row d-flex align-items-center flex-md-row flex-column-reverse"
        >
          <div class="col-12 col-md-6 px-1">
            <div class="story-img-2 rounded-3 overflow-hidden p-0 shadow-lg">
              <img :src="waiterBgUrl" alt="" class="w-100" />
            </div>
          </div>
          <div id="div2_text" class="col-12 col-md-6 ps-md-4 ps-0">
            <h2
              id="story-title2"
              class="brLineAfter pb-3 position-relative d-inline-block"
            >
              用心服務
            </h2>
            <div id="story-content2" class="pt-3">
              <p>
                無論是從餐點的製作到服務的呈現，我們都追求卓越，不妥協於任何細節。每一位顧客都是我們的貴賓，我們不僅提供美味的食物，更希望為您帶來一場感官的饗宴。
              </p>
              <p>
                我們的廚師團隊由世界各地的烹飪大師組成，他們將不同的烹飪技藝融入每一道菜品，讓您品味到地道的異國風情。而我們的服務團隊則以熱忱和專業見稱，隨時為您提供細緻入微的服務，確保您在"吃迷"的用餐體驗是無比愉悅而難忘的。
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 風格特色 -->
      <FeatureView></FeatureView>
      <div class="position-relative">
        <div
          class="bgImage"
          :style="'background-image:url(' + glassBgUrl + ')'"
        ></div>
        <div
          class="text-white text-center fs-2 position-absolute translate-middle top-50 start-50"
        >
          <div>吃迷，讓你一吃就迷戀的生活饗宴</div>
          <RouterLink to="/products">
            <button type="button" class="btn btn-primary mt-4">
              立即點餐
            </button></RouterLink
          >
        </div>
      </div>

      <!-- Loading -->
      <LoadingAni ref="refLoadingAni"></LoadingAni>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";

.bg-material {
  z-index: -1;
  object-fit: cover;
  filter: brightness(50%);
}

.brLineAfter {
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: $primary;
    border-radius: 100px;
  }
}

.titleArea {
  height: 100%;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  filter: brightness(0.2);
}

.bgImage {
  height: 30vh;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  filter: brightness(0.2);
}
</style>

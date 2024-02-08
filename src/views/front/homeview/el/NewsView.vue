<script>
import { gsap } from "gsap";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";

export default {
  data() {
    return {
      modules: [Autoplay, Pagination],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    gsapSwiper() {
      gsap.fromTo(
        ".mySwiperOuter",
        {
          y: 100,
          opacity: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: ".mySwiperOuter",
            start: "top 80%",
            end: "top 80%",
            toggleActions: "play none reverse none",
            // markers: true,
          },
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: ".mySwiperOuter",
            start: "top 80%",
            end: "top 80%",
            toggleActions: "play none reverse none",
            // markers: true,
          },
        }
      );
    },
  },
};
</script>

<template>
  <section>
    <div class="position-relative">
      <img
        class="bg-material position-absolute top-0 left-0 w-100 h-100"
        src="https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="材質背景"
      />
      <div class="pt-5 container" style="padding-bottom: 120px">
        <h3 class="text-start py-5 text-center">
          最新消息 | <span class="en">Upcoming Events</span>
        </h3>
        <div class="mySwiperOuter" style="opacity: 1">
          <swiper
            :grabCursor="true"
            :loop="true"
            :autoplay="{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }"
            :pagination="{
              clickable: true,
            }"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide>
              <div class="upcoming1"></div>
              <div
                class="position-absolute top-50 start-50 translate-middle text-white"
                style="width: 80%"
              >
                <h3 class="pb-3 mb-3 brLineAfter position-relative">
                  星級大廚饗宴，美食之夜即將開啟
                </h3>
                <p style="line-height: 2rem; letter-spacing: 1.5px">
                  綻放星級光芒的美食之夜即將降臨！我們誠摯邀請各位饕客共襄盛舉，品味由國際知名大廚精心烹製的匠心料理。豐富口味、雅致環境，讓您在這場美食盛會中感受味蕾的極致享受。
                </p>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="upcoming2"></div>
              <div
                class="position-absolute top-50 start-50 translate-middle text-white"
                style="width: 80%"
              >
                <h3 class="pb-3 mb-3 brLineAfter position-relative">
                  創意美食嘉年華，口感的藝術饗宴
                </h3>
                <p style="line-height: 2rem; letter-spacing: 1.5px">
                  準備好進入口感的藝術世界了嗎？我們即將舉辦創意美食嘉年華，邀您探索不一樣的味覺境界。現場有獨家新品發表，打破傳統，讓您的味蕾在這場美食盛會中翩翩起舞。
                </p>
              </div></swiper-slide
            ><swiper-slide>
              <div class="upcoming3"></div>
              <div
                class="position-absolute top-50 start-50 translate-middle text-white"
                style="width: 80%"
              >
                <h3 class="pb-3 mb-3 brLineAfter position-relative">
                  美食與藝術的交會，全新菜單揭曉
                </h3>
                <p style="line-height: 2rem; letter-spacing: 1.5px">
                  藝術家與大廚的完美結合，我們將推出全新菜單，呈現美食與藝術的極致交會。每一道菜品都是匠心之作，將烹飪提升至一種藝術境界。即刻預約，與我們一同品味這場美食與藝術的奇妙之旅。
                </p>
              </div></swiper-slide
            >
          </swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";

.bg-material {
  z-index: -1;
  object-fit: cover;
  filter: brightness(30%);
}
.mySwiper {
  height: 450px;
}

.upcoming1,
.upcoming2,
.upcoming3 {
  width: 100%;
  height: 100%;
  background-image: url("https://images.unsplash.com/photo-1428895009712-de9e58a18409?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: brightness(0.15);
}
.upcoming2 {
  background-image: url("https://images.unsplash.com/photo-1484156818044-c040038b0719?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
}
.upcoming3 {
  background-image: url("https://images.unsplash.com/photo-1615500025837-cf3a8716c83d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
}

.brLineAfter {
  padding-bottom: 1rem;

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
</style>

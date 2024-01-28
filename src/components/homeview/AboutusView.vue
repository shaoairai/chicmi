<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  methods: {
    // gsap setting
    gsapStory(tl) {
      ScrollTrigger.defaults({
        toggleActions: "play none reverse none",
      });

      ScrollTrigger.create({
        id: "#all",
        trigger: "#all",
        start: "top 130px",
        // endTrigger: "#div1",
        end: "+=2000",
        pin: "#all",
        pinSpacing: true,
        // markers: true,
      });

      // 第1段文字，移出
      gsap.to("#div1_text", {
        opacity: 0,
        duration: 1,
        y: -100,
        ease: "power2.inOut",
        scrollTrigger: {
          id: "div1_text",
          start: "center 30%",
          end: "center 30%",
          trigger: "#img1", // 指定元素
          toggleActions: "play none reverse none",
          // markers: true,
        },
      });

      // 第1張圖片，移出
      gsap.to("#img1", {
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          id: "img1",
          start: "center 30%",
          end: "center 30%",
          trigger: "#img1", // 指定元素
          toggleActions: "play none reverse none",
          // markers: true,
          pinSpacing: true,
        },
      });

      // 第1個圓點
      gsap.to("#light1", {
        scrollTrigger: {
          id: "light1",
          start: "center 30%",
          end: "center 30%",
          trigger: "#img1", // 指定元素
          toggleActions: "play none reverse none",
          onEnter: () =>
            document.querySelector("#light1").classList.remove("bg-primary"), // 進入時執行的函式
          onEnterBack: () =>
            document.querySelector("#light1").classList.add("bg-primary"), // 上滾進入時執行的函式
          // markers: true,
        },
      });

      // 第2段文字，移入
      gsap.from("#div2_text", {
        opacity: 0,
        duration: 1,
        y: 100,
        ease: "power2.inOut",
        scrollTrigger: {
          id: "div1_text",
          start: "center 30%",
          end: "center 30%",
          trigger: "#img1", // 指定元素
          toggleActions: "play none reverse none",
          // markers: true,
        },
      });

      // 第2張圖片，移入
      gsap.from("#img2", {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          id: "img2",
          start: "center 30%",
          end: "center 30%",
          trigger: "#img1", // 指定元素
          toggleActions: "play none reverse none",
          //markers: true,
          pinSpacing: true,
        },
      });

      // 第2段文字，移出
      gsap.to("#div2_text2", {
        opacity: 0,
        duration: 1,
        y: -100,
        ease: "power2.inOut",
        scrollTrigger: {
          id: "div2_text2",
          start: "center -500px",
          end: "center -500px",
          trigger: "#img2", // 指定元素
          toggleActions: "play none reverse none",
          // markers: true,
        },
      });

      // 第2個圓點
      gsap.from("#light2", {
        scrollTrigger: {
          id: "light2",
          start: "center 30%",
          end: "center 30%",
          trigger: "#img1", // 指定元素
          toggleActions: "play none reverse none",
          onEnter: () =>
            document.querySelector("#light2").classList.add("bg-primary"), // 進入時執行的函式
          onEnterBack: () =>
            document.querySelector("#light2").classList.remove("bg-primary"), // 上滾進入時執行的函式
          // markers: true,
        },
      });

      // 第2個圓點
      gsap.to("#light2_2", {
        scrollTrigger: {
          id: "light2_2",
          start: "center -500px",
          end: "center -500px",
          trigger: "#img1", // 指定元素
          toggleActions: "play none reverse none",
          onEnter: () =>
            document.querySelector("#light2").classList.remove("bg-primary"), // 進入時執行的函式
          onEnterBack: () =>
            document.querySelector("#light2").classList.add("bg-primary"), // 上滾進入時執行的函式
          // markers: true,
        },
      });

      // 第3段文字，移入
      gsap.from("#div3_text", {
        opacity: 0,
        duration: 1,
        y: 100,
        ease: "power2.inOut",
        scrollTrigger: {
          id: "div1_text",
          start: "center -500px",
          end: "center -500px",
          trigger: "#img2", // 指定元素
          toggleActions: "play none reverse none",
          // markers: true,
        },
      });

      // 第3張圖片，移入
      gsap.from("#img3", {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          id: "img3",
          start: "center -500px",
          end: "center -500px",
          trigger: "#img2", // 指定元素
          toggleActions: "play none reverse none",
          //markers: true,
          pinSpacing: true,
        },
      });

      // 第3個圓點
      gsap.from("#light3", {
        scrollTrigger: {
          id: "light3",
          start: "center -500px",
          end: "center -500px",
          trigger: "#img2", // 指定元素
          toggleActions: "play none reverse none",
          onEnter: () =>
            document.querySelector("#light3").classList.add("bg-primary"), // 進入時執行的函式
          onEnterBack: () =>
            document.querySelector("#light3").classList.remove("bg-primary"), // 上滾進入時執行的函式
          // markers: true,
        },
      });
    },
  },
  mounted() {
    // gsap setting
    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline({});

    // this.gsapStory(tl);
  },
  // beforeUnmount() {
  //   alert("kill");
  //   ScrollTrigger.killAll();
  //   const elementsToKill = [
  //     "#div1_text",
  //     "#img1",
  //     "#div2_text",
  //     "#img2",
  //     "#div2_text2",
  //     "#light2_2",
  //     "#div3_text",
  //     "#img3",
  //     "#light1",
  //     "#light2",
  //     "#light3",
  //   ];
  //   elementsToKill.forEach((elementSelector) => {
  //     gsap.killTweensOf(elementSelector);
  //   });
  // },
};
</script>

<template>
  <section>
    <div id="all" class="py-5 marble-bg">
      <h3 class="pb-3 text-center">
        我們的故事 | <span class="en">Our Story</span>
      </h3>
      <div class="d-flex flex-column flex-md-row align-items-center w-100">
        <div class="w-md-50 w-100">
          <div id="div1_text" class="mx-auto" style="width: 80%">
            <h4 class="pb-3 mb-3 text-start position-relative brLineAfter">
              奢華品味，美饌藝術
            </h4>
            <div>
              <p>
                我們的高級料理餐廳不僅讓您品味美食，更是一場視覺上的藝術饗宴。精心設計的用餐空間中，融合了現代與古典的藝術元素，每一處都彷彿是一幅畫，讓您在用餐的同時感受到美的震撼。這裡，美食與藝術完美結合，為您打造極致的視覺與味覺享受。
              </p>
            </div>
          </div>
        </div>
        <div class="w-md-50 w-100">
          <div class="story-img story-img-1 my-5 mx-auto"></div>
        </div>
      </div>

      <div
        class="d-flex flex-column flex-md-row-reverse align-items-center w-100"
      >
        <div class="w-md-50 w-100">
          <div id="div2_text" class="mx-auto" style="width: 80%">
            <h4 class="pb-3 mb-3 text-start position-relative brLineAfter">
              卓越服務，尊榮待客
            </h4>
            <div class="">
              <p>
                專業的服務團隊時刻以微笑迎接您的光臨。從您踏進餐廳那一刻開始，我們致力於提供無微不至的服務，使您感受到貴賓般的尊榮待遇。每一位顧客都是我們的至上重要，我們用心打造溫馨而獨特的用餐體驗，讓您在舒適的環境中盡情享受美好時光。
              </p>
            </div>
          </div>
        </div>
        <div class="w-md-50 w-100">
          <div class="story-img story-img-2 my-5 mx-auto"></div>
        </div>
      </div>

      <div class="d-flex flex-column flex-md-row align-items-center w-100">
        <div class="w-md-50 w-100">
          <div id="div3_text" class="mx-auto" style="width: 80%">
            <h4 class="pb-3 mb-3 text-start position-relative brLineAfter">
              完美環境，饗宴心靈
            </h4>
            <div>
              <p>
                我們的高級料理餐廳擁有令人陶醉的完美環境，華麗的燈光設計和舒適的座椅，以及悠揚的音樂，共同打造出一個迷人而寧靜的氛圍。這裡的環境不僅是一種視覺享受，更是一場心靈饗宴。無論是商務宴會、浪漫約會還是友情相聚，完美的環境都為您的用餐體驗增色不少，讓您的心靈在此獲得極致的寧靜與愉悅。
              </p>
            </div>
          </div>
        </div>
        <div class="w-md-50 w-100">
          <div class="story-img story-img-3 my-5 mx-auto"></div>
        </div>
      </div>
    </div>
  </section>
  <!-- gsap固定區的HTML -->
  <!-- <section>
    <div id="all" class="py-5 marble-bg">
      <h3 class="pb-3 text-center">我們的故事 | Our Story</h3>
      <div class="d-flex w-100" style="height: calc(100vh - 320px)">
        <div class="w-50">
          <div class="position-absolute" style="top: 40%; right: 20px">
            <div id="light1" class="light rounded-circle bg-primary"></div>
            <div id="light2_2">
              <div id="light2" class="light rounded-circle"></div>
            </div>
            <div id="light3" class="light rounded-circle"></div>
          </div>
          <div id="div1" class="display-block w-100 h-100">
            <div class="w-100 h-100 position-relative">
              <div
                id="div1_text"
                class="position-absolute start-50"
                style="transform: translate(-50%, -50%); top: calc(50% - 80px)"
              >
                <h4 class="pb-3 text-start">味蕾享受的早晨</h4>
                <div>
                  <p>
                    我們是一個追求味覺藝術的早午餐店，每一道料理都是我們對於美好的表白。烹調的過程如同詩意早晨的序曲，悠然而至，讓您在每一口中感受到生活的美好節奏。
                  </p>
                </div>
              </div>
              <div
                id="div2_text2"
                class="position-absolute start-50"
                style="transform: translate(-50%, -50%); top: calc(50% - 80px)"
              >
                <div id="div2_text">
                  <h4 class="pb-3 text-start">細緻呵護，用心服務</h4>
                  <div>
                    <p>
                      我們以用心待客，為您打造一場完美的用餐體驗。從熱情的問候到細緻的服務，我們致力於讓每一位賓客感受到賓至如歸的溫暖，成就一段美好的早午餐時光。
                    </p>
                  </div>
                </div>
              </div>
              <div
                id="div3_text"
                class="position-absolute start-50"
                style="transform: translate(-50%, -50%); top: calc(50% - 80px)"
              >
                <h4 class="pb-3 text-start">自然與品味的融合</h4>
                <div>
                  <p>
                    步入我們的空間，彷彿踏入一片自然綠洲。精心設計的環境，將大自然的美好融入用餐體驗，讓您在這裡感受到寧靜與舒適的美好氛圍。讓我們一同在這個品味綠洲中共譜美好時光。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-50">
          <div
            id="div2"
            class="display-block w-100 h-100 pt-5 position-relative"
          >
            <div>
              <img
                id="img1"
                class="round-img position-absolute top-0 left-0"
                src="https://images.unsplash.com/photo-1697221119922-e33d364c2819?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <img
                id="img2"
                class="round-img position-absolute top-0 left-0"
                src="https://images.unsplash.com/photo-1692881552436-02a5560f16e1?auto=format&fit=crop&q=80&w=1888&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <img
                id="img3"
                class="round-img position-absolute top-0 left-0"
                src="https://images.unsplash.com/photo-1704071085149-2dd6f2e0a37a?q=80&w=1806&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> -->
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";

.light {
  margin-bottom: 4px;
  width: 16px;
  height: 16px;
  border: 1px solid $primary;
  transition: all 1s;
}

.story-img {
  width: 80%;
  height: 50vh;
  background-size: cover;
  background-position: center;
  object-fit: cover;
}
.story-img-1 {
  background-image: url("https://images.unsplash.com/photo-1623594629187-2a68392cbab9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
}
.story-img-2 {
  background-image: url("https://images.unsplash.com/photo-1621873495868-6c5774cf6012?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
}
.story-img-3 {
  background-image: url("https://images.unsplash.com/photo-1504718855392-c0f33b372e72?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
}
.round-img {
  width: 400px;
  height: 400px;
  object-fit: cover;
}

.brLineAfter {
  padding-bottom: 1.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30%;
    height: 2px;
    background: $primary;
    border-radius: 100px;
  }
}
</style>

<script>
import { RouterLink } from "vue-router";
import { gsap } from "gsap";

export default {
  components: {
    RouterLink,
  },
  methods: {
    gsapInfo() {
      const vm = this;
      gsap.utils.toArray(".infoArea").forEach((item, i) => {
        gsap.fromTo(
          item,
          {
            y: 100,
            opacity: 0,
            duration: 1.5,
            delay: i * 0.35,
            scrollTrigger: {
              trigger: vm.$refs.infoAreaOuter,
              start: "top 80%",
              end: "top 80%",
              toggleActions: "restart none reverse none",
              // markers: true,
            },
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            delay: i * 0.35,
            scrollTrigger: {
              trigger: vm.$refs.infoAreaOuter,
              start: "top 80%",
              end: "top 80%",
              toggleActions: "restart none reverse none",
              // markers: true,
            },
          }
        );
      });
    },
  },
};
</script>

<template>
  <section>
    <div ref="infoAreaOuter" class="row g-0 flex-column flex-md-row">
      <div class="infoArea col" style="opacity: 1">
        <div class="position-relative">
          <div style="overflow: hidden">
            <div class="timeBg"></div>
          </div>
          <div
            class="d-flex flex-column text-white position-absolute translate-middle top-50 start-50 w-100 text-center px-3"
          >
            <h2 class="text-center pb-4">營業時間</h2>
            <div class="pb-1">
              <i class="bi bi-geo-alt-fill pe-2"></i>地址：407
              臺中市西屯區臺灣大道三段 99 號 1 樓
            </div>
            <div class="pb-1">
              <i class="bi bi-calendar-week-fill pe-2"></i
              >營業時間：11:00~21:00(週一公休)
            </div>
            <div class="pb-1">
              <i class="bi bi-telephone-fill pe-2"></i>聯絡電話：(04)2228-9111
            </div>
            <div class="text-center pt-4">
              <a href="tel:04-2228-9111">
                <button type="button" class="btn btn-primary px-5 w-auto">
                  致電訂位
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="infoArea col" style="opacity: 1">
        <div class="position-relative">
          <div style="overflow: hidden">
            <div class="orderBg"></div>
          </div>
          <div
            class="d-flex flex-column text-white position-absolute translate-middle top-50 start-50 w-100 text-center px-3"
          >
            <h2 class="text-center pb-4">線上訂餐</h2>
            <div class="pb-1">線上完成點餐，立即享受美食！</div>
            <div class="text-center pt-4">
              <RouterLink to="/products">
                <button type="button" class="btn btn-primary px-5 w-auto">
                  開始點餐
                </button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 地圖 -->
    <div class="row g-0">
      <div style="height: 450px">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1820.140357845901!2d120.64600807119726!3d24.161885998090128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d8dbb93a3e9%3A0xca39b9d70340cfab!2zNDA35Y-w5Lit5biC6KW_5bGv5Y2A6Ie654Gj5aSn6YGT5LiJ5q61OTnomZ8!5e0!3m2!1szh-TW!2stw!4v1707373519834!5m2!1szh-TW!2stw"
          class="w-100 h-100"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeBg,
.orderBg {
  height: 480px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: brightness(0.25);
  transition: all 0.25s ease-in-out;
}
.timeBg {
  background-image: url("https://images.unsplash.com/photo-1578474846386-fed209b6ddad?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
}

.orderBg {
  background-image: url("https://images.unsplash.com/photo-1588675646184-f5b0b0b0b2de?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
}

.infoArea:hover .timeBg,
.infoArea:hover .orderBg {
  filter: brightness(0.15);
  transform: scale(1.1); /* 放大 1.1 倍，可以根據需要調整比例 */
}
</style>

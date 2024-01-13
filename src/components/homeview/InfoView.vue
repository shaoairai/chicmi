<script>
import { RouterLink } from "vue-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  components: {
    RouterLink,
  },
  methods: {
    gsapInfo() {
      const vm = this;
      gsap.utils.toArray(".infoArea").forEach((item, i) => {
        gsap.from(item, {
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
        });
      });
    },
  },
};
</script>

<template>
  <section>
    <div ref="infoAreaOuter" class="row g-0 flex-column flex-md-row">
      <div class="infoArea col">
        <div class="position-relative">
          <div class="timeBg"></div>
          <div
            class="d-flex flex-column text-white position-absolute translate-middle top-50 start-50"
          >
            <h2 class="text-center pb-4">營業時間</h2>
            <div class="pb-1">
              <i class="bi bi-geo-alt-fill pe-2"></i
              >地址：970花蓮縣花蓮市三民街52號
            </div>
            <div class="pb-1">
              <i class="bi bi-calendar-week-fill pe-2"></i
              >營業時間：11:00~20:00(週一公休)
            </div>
            <div class="pb-1">
              <i class="bi bi-telephone-fill pe-2"></i>聯絡電話：(03)831-1131
            </div>
            <div class="text-center pt-4">
              <a href="tel:03-831-1131">
                <button type="button" class="btn btn-primary w-50">
                  致電訂位
                </button></a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="infoArea col">
        <div class="position-relative">
          <div class="orderBg"></div>
          <div
            class="d-flex flex-column text-white position-absolute translate-middle top-50 start-50"
          >
            <h2 class="text-center pb-4">線上訂餐</h2>
            <div class="pb-1">線上完成點餐，立即享受美食！</div>
            <div class="text-center pt-4">
              <RouterLink to="/products">
                <button type="button" class="btn btn-primary w-50">
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
          class="w-100 h-100"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3645.449189215327!2d121.60666607507892!3d23.97991017992707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34689fc13b9d5f11%3A0x6eb61ff6cedce033!2zOTcw6Iqx6JOu57ij6Iqx6JOu5biC5LiJ5rCR6KGXNTLomZ8!5e0!3m2!1szh-TW!2stw!4v1691218917951!5m2!1szh-TW!2stw"
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
.timeBg {
  height: 480px;
  background-image: url("@/assets/img/sloganbg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: brightness(0.2);
}

.orderBg {
  height: 480px;
  background-image: url("@/assets/img/brand_bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: brightness(0.2);
}
</style>

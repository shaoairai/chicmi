<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  data() {
    return {
      // 風格特色
      features: [
        {
          id: 1,
          icon: "bell-concierge",
          text: "美食饗宴",
        },
        {
          id: 2,
          icon: "building-wheat",
          text: "清爽環境",
        },
        {
          id: 3,
          icon: "hand-holding-heart",
          text: "貼心服務",
        },
        {
          id: 4,
          icon: "mountain-sun",
          text: "景色優美",
        },
        {
          id: 5,
          icon: "money-bill-trend-up",
          text: "物超所值",
        },
        {
          id: 6,
          icon: "champagne-glasses",
          text: "尊爵享受",
        },
      ],
    };
  },
  methods: {
    gsapFeature() {
      this.$nextTick(() => {
        gsap.utils.toArray(".feature-card-outer").forEach((item, i) => {
          gsap.fromTo(
            item,
            {
              y: 100,
              duration: 1,
              // ease: Power2.inOut,
              delay: i * 0.12, // 這樣就能依順序
              opacity: 0,
              scrollTrigger: {
                trigger: "#feature-card-gsap-trigger",
                start: "center 75%",
                end: "center 75%",
                toggleActions: "restart none reverse none",
                // markers: true,
              },
            },
            {
              y: 0,
              duration: 1,
              // ease: Power2.inOut,
              delay: i * 0.12, // 這樣就能依順序
              opacity: 1,
              scrollTrigger: {
                trigger: "#feature-card-gsap-trigger",
                start: "center 75%",
                end: "center 75%",
                toggleActions: "restart none reverse none",
                // markers: true,
              },
            }
          );
        });
      });
    },
  },
  mounted() {
    this.gsapFeature();
  },
  beforeUnmount() {
    // alert("kill");
    ScrollTrigger.killAll();
    const elementsToKill = [".feature-card-outer"];
    elementsToKill.forEach((elementSelector) => {
      gsap.killTweensOf(elementSelector);
    });
  },
};
</script>

<template>
  <section>
    <div class="container pb-5" style="padding-top: 120px">
      <div class="row">
        <div class="col-12 text-center">
          <h2 class="brLineAfter position-relative d-inline-block">風格特色</h2>
          <div id="feature-card-gsap-trigger" class="pt-3 d-flex flex-wrap">
            <div
              class="py-3 col-6 col-sm-4 col-md-2 feature-card-outer"
              v-for="item in features"
              :key="item.id"
            >
              <div
                class="p-3 m-3 h-100 feature-card d-flex flex-column justify-content-center"
              >
                <font-awesome-icon
                  :icon="['fas', item.icon]"
                  class="text-primary"
                  style="font-size: 72px"
                />
                <div class="fs-4 pt-3" style="letter-spacing: 2px">
                  <span style="white-space: nowrap">{{
                    item.text.substring(0, 2)
                  }}</span>
                  <span style="white-space: nowrap">{{
                    item.text.substring(item.text.length - 2)
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";

section {
  background: $gray-900;
}

.feature-card-outer {
  height: 300px;
  user-select: none;
}

.feature-card {
  transition: all 0.5s ease;
  &:hover {
    background: $gray-800;
    border-radius: 8px;
    box-shadow: 0px 4px 4px black;
  }
}
</style>

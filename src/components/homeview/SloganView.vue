<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  methods: {
    gsapStory(tl) {
      // 文字
      gsap.fromTo(
        ".sloganTxt",
        {
          opacity: 0,
          y: 100,
          duration: 1,
          scrollTrigger: {
            trigger: ".sloganArea",
            start: "top center",
            end: "top center",
            toggleActions: "restart none reverse none",
            // markers: true,
          },
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".sloganArea",
            start: "top center",
            end: "top center",
            toggleActions: "restart none reverse none",
            // markers: true,
          },
        }
      );
    },
  },
  mounted() {
    // gsap setting
    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline({});
    this.gsapStory(tl);
  },
  beforeUnmount() {
    // alert("kill");
    ScrollTrigger.killAll();
    const elementsToKill = [".sloganTxt"];
    elementsToKill.forEach((elementSelector) => {
      gsap.killTweensOf(elementSelector);
    });
  },
};
</script>

<template>
  <section>
    <div class="sloganArea position-relative">
      <div class="sloganBg"></div>
      <div
        class="sloganTxt w-100 h-100 position-absolute top-0 start-0"
        style="opacity: 1"
      >
        <h3
          class="position-absolute translate-middle top-50 start-50 text-white text-center fs-2"
        >
          <span class="lh-base" style="white-space: nowrap">癡迷美食，</span>
          <span class="lh-base" style="white-space: nowrap"
            >享受無比的舌尖饗宴！</span
          >
        </h3>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sloganBg {
  height: 480px;
  background-image: url("https://images.unsplash.com/photo-1627947063935-55577ec3c2e1?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  filter: brightness(0.2);
}
</style>

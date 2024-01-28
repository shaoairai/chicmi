<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  data() {
    return {
      ori: [{ val: 0 }, { val: 0 }, { val: 0 }, { val: 0 }],
      target: [{ val: 2500 }, { val: 360 }, { val: 12 }, { val: 25 }],
      numberList: [
        {
          number: 0,
          text: "服務人次",
        },
        {
          number: 0,
          text: "五星評價",
        },
        {
          number: 0,
          text: "競賽獲獎",
        },
        {
          number: 0,
          text: "年度新品",
        },
      ],
    };
  },
  methods: {
    gsapStory(tl) {
      const vm = this;
      gsap.utils.toArray(".numberArea").forEach((el, i) => {
        gsap.to(vm.ori[i], {
          val: vm.target[i].val,
          duration: 2.5,
          scrollTrigger: {
            trigger: el, // 這裡固定寫el
            start: "center 85%",
            end: "center 85%",
            // markers: true, // 輔助線
            toggleActions: "play none none none",
          },
          onUpdate() {
            vm.numberList[i]["number"] = vm.ori[i].val.toFixed(0);
          },
        });
      });
    },
  },
  mounted() {
    // gsap setting
    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline({});

    this.gsapStory(tl);
  },
};
</script>

<template>
  <section>
    <div class="container p-5">
      <div class="row">
        <div class="col text-center" v-for="(item, i) in numberList" :key="i">
          <div class="fs-1 numberArea en">{{ item["number"] }}+</div>
          <div class="fs-4">{{ item["text"] }}</div>
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
</style>

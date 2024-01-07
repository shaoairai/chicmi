<script>
export default {
  data() {
    return {
      numberList: [
        {
          number: 2500,
          text: "服務人次",
        },
        {
          number: 360,
          text: "五星評價",
        },
        {
          number: 12,
          text: "競賽獲獎",
        },
        {
          number: 25,
          text: "年度新品",
        },
      ],
    };
  },
};
</script>

<template>
  <section>
    <div class="container p-5">
      <div class="row">
        <div class="col text-center" v-for="(item, i) in numberList" :key="i">
          <div class="fs-1">{{ item["number"] }}+</div>
          <div class="fs-4">{{ item["text"] }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";

section {
  background: $gray-800;
}
</style>

<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  components: {
    RouterLink,
    RouterView,
  },
};
</script>

<template>
  <div
    class="text-center py-2 bg-dark shadow position-fixed top-0 start-0 w-100"
    style=""
  >
    <h3 class="fw-bold text-primary pt-2">吃迷 CHIC MI</h3>
    <h5 class="pt-1">產品管理系統</h5>
  </div>
  <RouterView />
</template>

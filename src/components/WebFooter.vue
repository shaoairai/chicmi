<script>
import { RouterLink, RouterView } from 'vue-router';

export default {
  data() {
    return {
      currentYear: null,
    };
  },
  mounted() {
    this.currentYear = new Date().getFullYear();
  },
};
</script>
<template>
  <!-- footer -->
  <footer>
    <div class="footer-column">
      <div class="container text-white py-5">
        <div class="row flex-column flex-md-row">
          <div class="col py-4">
            <h3>吃迷 CHIC MI</h3>
            <div class="d-flex fs-4">
              <i class="bi bi-instagram me-2"></i>
              <i class="bi bi-facebook"></i>
            </div>
          </div>
          <div class="col py-4">
            <h3>店面資訊</h3>
            <div class="d-flex flex-column text-white">
              <div class="pb-1">
                <i class="bi bi-geo-alt-fill pe-2"></i>地址：970花蓮縣花蓮市三民街52號
              </div>
              <div class="pb-1">
                <i class="bi bi-calendar-week-fill pe-2"></i>營業時間：11:00~20:00(週一公休)
              </div>
              <div class="pb-1">
                <i class="bi bi-telephone-fill pe-2"></i>聯絡電話：(03)831-1131
              </div>
            </div>
          </div>
          <div class="col py-4">
            <h3>網站導覽</h3>
            <div class="d-flex flex-column text-white">
              <div class="pb-1">
                <RouterLink to="about" class="footer-nav">品牌故事</RouterLink>
              </div>
              <div class="pb-1">
                <RouterLink to="products" class="footer-nav">線上點餐</RouterLink>
              </div>
              <div class="pb-1">
                <RouterLink to="contact" class="footer-nav">聯絡我們</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <!-- 底部列 -->
  <footer class="w-100 py-3 text-center text-bg-secondary bg-dark text-light">
    <div>© {{ currentYear }} Copyright: 吃迷 CHIC MI</div>
  </footer>
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";

.footer-column {
  background: $gray-800;
}

.footer-nav {
  color: $white;

  &:hover {
    color: $gray-300;
  }
}
</style>

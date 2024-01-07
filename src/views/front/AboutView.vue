<script>
import brandBg from '@/assets/img/brand_bg.jpg'
import waiterBg from '@/assets/img/waiter.jpg'
import glassBg from '@/assets/img/glassBg.jpg'

export default {
  data() {
    return {
      text: "About頁",
      brandImgUrl: brandBg,
      waiterBgUrl: waiterBg,
      glassBgUrl: glassBg,
      titleBg: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      // 風格特色
      features: [
        {
          id: 1,
          icon: "bell-concierge",
          text: "美食饗宴"
        },
        {
          id: 2,
          icon: "building-wheat",
          text: "清爽環境"
        },
        {
          id: 3,
          icon: "hand-holding-heart",
          text: "貼心服務"
        },
        {
          id: 4,
          icon: "mountain-sun",
          text: "景色優美"
        },
        {
          id: 5,
          icon: "money-bill-trend-up",
          text: "物超所值"
        },
        {
          id: 6,
          icon: "champagne-glasses",
          text: "尊爵享受"
        },
      ]
    };
  },
};
</script>

<template>
  <section>
    <!-- 圖片 -->
    <!-- <div class="bgImage"></div> -->
    <div class="position-relative" style="height: 200px">
      <div class="titleArea" :style="{ 'background-image': 'url(' + titleBg + ')' }"></div>
      <div class="fs-2 text-white position-absolute translate-middle start-50 top-50">
        品牌故事
      </div>
    </div>
    <div class="container py-5">
      <div class="row d-flex align-items-center">
        <div class="col-12 col-md-6 pe-md-5 pe-0">
          <h2 class="brLineAfter position-relative d-inline-block">品牌背景</h2>
          <div class="pt-3">
            <p>
              吃迷早午餐店是一家融合了獨特創意與美味食材的早午餐餐廳。我們的品牌名稱"吃迷"象徵著我們對食物的熱情，以及希望讓每一位顧客都能在我們的餐廳中迷失於美味的味蕾之中。吃迷以新鮮、健康和創新的菜單聞名，為您提供一個獨特的用餐體驗。
            </p>
          </div>
        </div>
        <div class="col-12 col-md-6 px-1">
          <div class="rounded-3 overflow-hidden p-0 shadow-lg">
            <img :src="brandImgUrl" alt="" class="w-100">
          </div>
        </div>
      </div>
    </div>
    <div class="container py-5">
      <div class="row d-flex align-items-center flex-md-row flex-column-reverse">
        <div class="col-12 col-md-6 px-1">
          <div class="rounded-3 overflow-hidden p-0 shadow-lg">
            <img :src="waiterBgUrl" alt="" class="w-100">
          </div>
        </div>
        <div class="col-12 col-md-6 ps-md-4 ps-0">
          <h2 class="brLineAfter position-relative d-inline-block">用心服務</h2>
          <div class="pt-3">
            <p>
              吃迷不僅關注食物的品質，也關注顧客的需求。我們的團隊致力於提供親切、專業的服務，確保您在吃迷早午餐店中感受到家的溫暖。無論您是單獨前來用餐，還是和朋友家人一起來，我們都希望您享受到最美味的食物和最溫馨的用餐體驗。歡迎來到吃迷，一個讓您迷失於美食世界的地方！
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container py-5">
      <div class="row">
        <div class="col-12 text-center">
          <h2 class="brLineAfter position-relative d-inline-block">風格特色</h2>
          <div class="pt-3 d-flex flex-wrap">
            <div class="py-3 col-12 col-sm-6 col-md-4 feature-card-outer" v-for="item in features" :key="item.id">
              <div class="p-3 m-3 h-100 feature-card d-flex flex-column justify-content-center">
                <font-awesome-icon :icon="['fas', item.icon]" class="text-primary" style="font-size: 72px;" />
                <div class="fs-4 pt-3" style="letter-spacing: 2px;">{{ item.text }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="position-relative">
      <div class="bgImage" :style="'background-image:url(' + glassBgUrl + ')'"></div>
      <div class="text-white fs-2 position-absolute translate-middle top-50 start-50">吃迷，讓你一吃就迷戀的生活饗宴</div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";

.brLineAfter {
  padding-bottom: 0.5rem;

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


.titleArea {
  height: 100%;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  filter: brightness(0.2);
}

.bgImage {
  height: 30vh;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  filter: brightness(0.2);
}

.feature-card-outer {
  height: 300px;
}

.feature-card:hover {
  background: $gray-100;
  border-radius: 8px;
}
</style>

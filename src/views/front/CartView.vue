<script>
import { RouterLink } from 'vue-router';
import { mapState, mapActions } from 'pinia';
import { cartStore } from '../../stores/counter'
import { login } from '../../utils/token/getToken';

export default {
  data() {
    return {
      text: "Products頁",
      token: "",
    }
  },
  methods: {
    takeToken() {
      // 從 cookie 取出 token
      const tokenCookie = document.cookie
        .split(";")
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith("token="));
      const token = tokenCookie ? tokenCookie.split("=")[1] : null;
      return token;
    },
    // 該產品+1
    ...mapActions(cartStore, ['plusProduct', 'minusProduct', 'delProduct']),
  },
  components: {
    RouterLink
  },
  computed: {
    ...mapState(cartStore, ['productList', 'deliveryFee', 'calcTotal']),
  },
  async mounted() {
    let takenToken = this.takeToken();
    this.token = takenToken;

    // 沒 token 就踢出去
    if (!takenToken) {
      // 登入
      await login();

      takenToken = this.takeToken();
      this.token = takenToken;
    }
  }
}
</script>

<template>
  <section class="bg-lightgray">
    <!-- 無資料 -->
    <div class="py-5 container" v-if="productList.length <= 0">
      <div class="fs-2">購物車無資料</div>
      <RouterLink to="/products" class="btn btn-primary">繼續逛逛</RouterLink>
    </div>
    <!-- 菜單 -->
    <div class="py-5 container" v-if="productList.length > 0">
      <!-- 名稱  -->
      <div class="row p-3">
        <div class="col d-flex justify-content-center">商品圖</div>
        <div class="col d-flex justify-content-center">品名</div>
        <div class="col d-flex justify-content-center">價格</div>
        <div class="col d-flex justify-content-center">數量</div>
        <div class="col d-flex justify-content-center">小計</div>
        <div class="col d-flex justify-content-center">移除</div>
      </div>
      <div class="row">
        <div class="col">
          <div class="products-list-area px-3 bg-white rounded-3">
            <template v-for="(item, index) in productList" :key="item.id">
              <!-- 單一品項 -->
              <div class="row align-items-center py-3">
                <div class="col w-100 overflow-hidden">
                  <div class="position-relative" style="padding-top: 100%;">
                    <img :src="item.img" class="position-absolute top-0 start-0 w-100 h-100 rounded-3"
                      style="object-fit: cover;" alt="...">
                  </div>
                </div>
                <div class="col d-flex justify-content-center">{{ item.name }}</div>
                <div class="col d-flex justify-content-center">NT$ {{ item.price }}</div>
                <div class="col d-flex justify-content-center align-items-center">
                  <div @click="minusProduct(item)" class="cursor-pointer">
                    <i class="bi bi-dash-circle-fill text-primary fs-4"></i>
                  </div>
                  <input type="number" class="input-number mx-2" v-model="item.number" readonly />
                  <div @click="plusProduct(item)" class="cursor-pointer">
                    <i class="bi bi-plus-circle-fill text-primary fs-4"></i>
                  </div>
                </div>
                <div class="col d-flex justify-content-center">NT$ {{ item.price * item.number }}</div>
                <div class="col d-flex justify-content-center cursor-pointer" @click="delProduct(item)">X</div>
              </div>
              <div class="section-line" v-if="index < productList.length - 1"></div>
            </template>
          </div>
        </div>
      </div>
      <div class="row py-3">
        <div class="text-end">
          <div class="col">
            運費：NT$ {{ deliveryFee }}
          </div>
        </div>
      </div>
      <div class="row pb-4">
        <h4 class="text-end">
          <div class="col">
            總計：NT$ {{ calcTotal }}
          </div>
        </h4>
      </div>
      <div class="row">
        <div class="col text-end">
          <RouterLink to="/products">繼續逛逛</RouterLink>
          <button type="button" class="btn btn-primary px-5 ms-4">結帳</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";

.cursor-pointer {
  cursor: pointer;
}

.section-line {
  border-bottom: 2px solid $gray-300;
}

.bg-lightgray {
  background: $gray-200;
}

.products-list-area {
  box-shadow: 0px 2px 4px 2px lightgray;
}

.input-number {
  width: 42px;
  -webkit-appearance: textfield;
  appearance: textfield;
}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
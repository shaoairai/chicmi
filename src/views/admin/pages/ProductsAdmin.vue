<script>
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";
import { mapActions, mapState } from "pinia";
import { cartStore } from "@/stores/counter";
import { login, getTokenFromCookie } from "@/utils/token/getToken";

import AddproductModal from "@/views/admin/pages/AddproductModal.vue";
import EditproductModal from "@/views/admin/pages/EditproductModal.vue";
import FinishPop from "@/components/popview/FinishPop.vue";
import SureDelPop from "@/components/popview/SureDelPop.vue";
import { Modal } from "bootstrap";

export default {
  data() {
    return {
      token: "",
      // 分類
      categories: [],
      // 分類產品
      cateProducts: {},
      // add 彈出視窗的建立按鈕
      addCheckBool: true,
      // edit 彈出視窗的建立按鈕
      editCheckBool: true,
      // 修改暫存產品資料
      productTmpData: {},

      // 新增彈出視窗Modal
      addProductPopModal: "",
      // 編輯彈出視窗Modal
      editProductPopModal: "",
    };
  },
  computed: {
    ...mapState(cartStore, ["productList", "products"]),
  },
  components: {
    RouterLink,
    RouterView,
    AddproductModal,
    EditproductModal,
    FinishPop,
    SureDelPop,
  },
  methods: {
    getProducts() {
      const conf = {
        method: "GET",
        url: `${import.meta.env.VITE_APP_URL}v2/api/${
          import.meta.env.VITE_APP_PATH
        }/admin/products/all`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios(conf)
        .then((res) => {
          console.log(res);
          // 存放所有產品
          const saveData = cartStore();
          saveData.saveProducts(res.data.products);

          // 篩選狀態為全部
          this.cateProducts = res.data.products;
          // console.log(this.products);
          this.getCategories();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    // 取得所有分類
    getCategories() {
      const categoriesArr = new Set();
      Object.keys(this.products).forEach((key) => {
        const value = this.products[key];
        categoriesArr.add(value.category);
      });
      this.categories = categoriesArr;
    },
    // 新增產品彈出視窗
    addProductForm() {
      this.addProductPopModal = new Modal("#addProductModal");
      this.addProductPopModal.show();
    },
    // 新增產品
    addProduct(value) {
      // console.log(value);
      const vm = this;
      // 按鈕不可按
      vm.addCheckBool = false;

      // console.log("新增產品");

      const data = {
        data: {
          title: value.title,
          category: value.category,
          origin_price: value.price,
          price: value.price,
          unit: value.unit,
          description: value.description,
          content: value.content,
          is_enabled: 1,
          imageUrl: value.imageUrl,
          imagesUrl: [],
        },
      };

      const conf = {
        method: "POST",
        url: `${import.meta.env.VITE_APP_URL}v2/api/${
          import.meta.env.VITE_APP_PATH
        }/admin/product`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(conf)
        .then((res) => {
          // console.log("建立成功");
          // console.log(res);

          // 恢復按鈕
          vm.addCheckBool = true;

          // 關閉視窗
          vm.addProductPopModal.hide();

          // 清除表單
          vm.$refs.refAddproductModal.formReset();

          // 完成建立pop
          vm.$refs.FinishPop.popshow("add");

          // 重取資料
          vm.getProducts();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    // 修改產品
    editProduct(product) {
      const vm = this;
      // console.log("修改產品");
      // console.log(product);

      vm.editProductPopModal = new Modal("#editProductModal");
      vm.editProductPopModal.show();

      // 目前內容存入
      const productTmp = JSON.parse(JSON.stringify(product));
      vm.productTmpData = productTmp;
      // console.log(vm.productTmpData);
    },
    // 完成修改產品
    confirmeditProduct(value) {
      // console.log(value);
      const vm = this;
      // 按鈕不可按
      vm.editCheckBool = false;

      // console.log("完成修改產品");

      const data = {
        data: {
          title: value.title,
          category: value.category,
          origin_price: value.price,
          price: value.price,
          unit: value.unit,
          description: value.description,
          content: value.content,
          is_enabled: 1,
          imageUrl: value.imageUrl,
          imagesUrl: [],
        },
      };

      const conf = {
        method: "PUT",
        url: `${import.meta.env.VITE_APP_URL}v2/api/${
          import.meta.env.VITE_APP_PATH
        }/admin/product/${vm.productTmpData.id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(conf)
        .then((res) => {
          // console.log("修改成功");
          // console.log(res);

          // 移除pop視窗
          vm.editProductPopModal.hide();

          // 恢復按鈕
          vm.editCheckBool = true;

          // 重取資料
          vm.getProducts();

          // 完成修改pop
          vm.$refs.FinishPop.popshow("edit");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    // 確定要刪除產品嗎
    sureDelProduct(product) {
      const vm = this;

      // 彈出確認視窗
      vm.$refs.refSureDelPop.popshow(product);
    },
    // 刪除產品
    delProduct(product) {
      const vm = this;
      // console.log("刪除產品");
      // console.log(product);
      const conf = {
        method: "DELETE",
        url: `${import.meta.env.VITE_APP_URL}v2/api/${
          import.meta.env.VITE_APP_PATH
        }/admin/product/${product.id}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios(conf)
        .then((res) => {
          // console.log(res);

          // 移除pop視窗
          vm.$refs.refSureDelPop.pophide();

          // 恢復按鈕
          vm.$refs.refSureDelPop.delCheckBool = true;

          // 重取資料
          vm.getProducts();

          // 完成刪除pop
          vm.$refs.FinishPop.popshow("del");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  async mounted() {
    const takenToken = getTokenFromCookie();
    if (!takenToken) {
      await login();
    }

    this.getProducts();
  },
};
</script>

<template>
  <section style="padding-top: 100px">
    <div class="container pb-5">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <RouterLink to="/"
            ><font-awesome-icon icon="fa-solid fa-arrow-left-long" />
            回到前台
          </RouterLink>
        </div>
        <div class="d-inline-block my-3">
          <div
            class="btn btn-primary d-flex align-items-center ms-auto"
            @click="addProductForm"
          >
            <font-awesome-icon icon="fa-solid fa-circle-plus" />
            <span class="ps-1">新增產品</span>
          </div>
        </div>
      </div>
      <table class="w-100">
        <thead>
          <tr class="d-none d-lg-table-row">
            <td>產品名稱</td>
            <td>單位</td>
            <td>分類</td>
            <td>內含物</td>
            <td>說明</td>
            <td>價格(NT$)</td>
            <td>圖片</td>
            <td>修改</td>
            <td>刪除</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, i) in products"
            :key="i"
            class="d-flex flex-column d-lg-table-row"
            style="line-height: 1.75rem"
          >
            <td class="text-start text-lg-center" style="order: 2">
              <span class="d-lg-none">產品名稱：</span>{{ product.title }}
            </td>
            <td class="text-start text-lg-center" style="order: 3">
              <span class="d-lg-none">單位：</span>{{ product.unit }}
            </td>
            <td class="text-start text-lg-center" style="order: 4">
              <span class="d-lg-none">分類：</span>{{ product.category }}
            </td>
            <td class="text-start text-lg-center" style="order: 5">
              <span class="d-lg-none">內含物：</span>{{ product.content }}
            </td>
            <td class="describe text-start text-lg-center" style="order: 6">
              <span class="d-lg-none">說明：</span>{{ product.description }}
            </td>
            <td class="text-start text-lg-center" style="order: 7">
              <span class="d-lg-none">價格：NT$ </span>{{ product.price }}
            </td>
            <td class="text-start text-lg-center" style="order: 1">
              <img
                :src="product.imageUrl"
                class="product-img rounded-3"
                :alt="product.title"
                style="object-fit: cover"
              />
            </td>
            <div class="d-lg-none" style="order: 8">
              <td class="text-start text-lg-center" style="order: 8">
                <div
                  class="btn btn-primary cursor-pointer pb-2"
                  @click="editProduct(product)"
                >
                  <font-awesome-icon
                    icon="fa-solid fa-pen-to-square"
                    style="vertical-align: middle"
                  />
                  <span class="ps-1 d-lg-none" style="vertical-align: middle">
                    修改
                  </span>
                </div>
              </td>
              <td class="text-start text-lg-center" style="order: 9">
                <div
                  class="btn btn-danger cursor-pointer pb-2"
                  @click="sureDelProduct(product)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash-can" />
                  <span class="ps-2 d-lg-none">刪除</span>
                </div>
              </td>
            </div>
            <td
              class="text-start text-lg-center d-none d-lg-table-cell"
              style="order: 8"
            >
              <div
                class="btn btn-primary cursor-pointer pb-2"
                @click="editProduct(product)"
              >
                <font-awesome-icon
                  icon="fa-solid fa-pen-to-square"
                  style="vertical-align: middle"
                />
                <span class="ps-1 d-lg-none" style="vertical-align: middle">
                  修改
                </span>
              </div>
            </td>
            <td
              class="text-start text-lg-center d-none d-lg-table-cell"
              style="order: 9"
            >
              <div
                class="btn btn-danger cursor-pointer pb-2"
                @click="sureDelProduct(product)"
              >
                <font-awesome-icon icon="fa-solid fa-trash-can" />
                <span class="ps-2 d-lg-none">刪除</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- 建立產品pop -->
  <AddproductModal
    ref="refAddproductModal"
    :addProduct="addProduct"
    :addCheckBool="addCheckBool"
  ></AddproductModal>

  <!-- 修改產品pop -->
  <EditproductModal
    :confirmeditProduct="confirmeditProduct"
    :editCheckBool="editCheckBool"
    :productTmpData="productTmpData"
  ></EditproductModal>

  <!-- 刪除產品pop -->
  <SureDelPop ref="refSureDelPop" :delProduct="delProduct"></SureDelPop>

  <!-- 完成pop -->
  <FinishPop ref="FinishPop"></FinishPop>
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";

section {
  background: $gray-900;
}

tr {
  border-bottom: 1px solid $gray-700;
}

td {
  text-align: center;
  padding: 12px;
}

.product-img {
  width: 50%;
  margin: 0 auto;
  display: block;
}

.describe {
  width: 100%;
}

@media screen and (min-width: 992px) {
  .product-img {
    width: 100px;
  }

  .describe {
    width: 180px;
  }
}
</style>

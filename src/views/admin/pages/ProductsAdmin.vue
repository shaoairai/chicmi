<script>
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";
import { mapActions, mapState } from "pinia";
import { cartStore } from "../../../stores/counter";
import { login } from "../../../utils/token/getToken";
import Swal from "sweetalert2";

import AddproductModal from "@/views/admin/pages/AddproductModal.vue";
import EditproductModal from "@/views/admin/pages/EditproductModal.vue";

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
    getProducts() {
      const conf = {
        method: "GET",
        url: `${import.meta.env.VITE_APP_URL}v2/api/${
          import.meta.env.VITE_APP_PATH
        }/admin/products/all`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${this.token}`,
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
    // 新增產品
    addProduct(value) {
      console.log(value);
      const vm = this;
      // 按鈕不可按
      vm.addCheckBool = false;

      console.log("新增產品");

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
          Authorization: `${this.token}`,
        },
        data: data,
      };
      axios(conf)
        .then((res) => {
          alert("建立成功");
          console.log(res);

          // 恢復按鈕
          vm.addCheckBool = true;

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
      console.log("修改產品");
      console.log(product);

      // 目前內容存入
      const productTmp = JSON.parse(JSON.stringify(product));
      vm.productTmpData = productTmp;
      console.log(vm.productTmpData);
    },
    // 完成修改產品
    confirmeditProduct(value) {
      console.log(value);
      const vm = this;
      // 按鈕不可按
      vm.editCheckBool = false;

      console.log("完成修改產品");

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
          Authorization: `${this.token}`,
        },
        data: data,
      };
      axios(conf)
        .then((res) => {
          alert("修改成功");
          console.log(res);

          // 恢復按鈕
          vm.editCheckBool = true;

          // 重取資料
          vm.getProducts();
        })
        .catch((err) => {
          console.log(err.response);
        });
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
          Authorization: `${this.token}`,
        },
      };
      axios(conf)
        .then((res) => {
          console.log(res);
          Swal.fire("刪除成功", "", "success");
          // 重新取得
          vm.getProducts();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
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
            回到前台</RouterLink
          >
        </div>
        <div class="d-inline-block my-3">
          <div
            class="btn btn-primary d-flex align-items-center ms-auto"
            data-bs-toggle="modal"
            data-bs-target="#addProductModal"
          >
            <font-awesome-icon icon="fa-solid fa-circle-plus" />
            <span class="ps-1">新增產品</span>
          </div>
        </div>
      </div>
      <table class="w-100">
        <thead>
          <tr>
            <td>產品名稱</td>
            <td>單位</td>
            <td>分類</td>
            <td>內含物</td>
            <td>說明</td>
            <td>價格</td>
            <td>圖片</td>
            <td>修改</td>
            <td>刪除</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, i) in products" :key="i">
            <td>{{ product.title }}</td>
            <td>{{ product.unit }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.content }}</td>
            <td style="max-width: 120px; line-height: 1.75rem">
              {{ product.description }}
            </td>
            <td>NT$ {{ product.price }}</td>
            <td>
              <img
                :src="product.imageUrl"
                class="rounded-3"
                :alt="product.title"
                style="width: 100px; object-fit: cover"
              />
            </td>
            <td>
              <div
                class="cursor-pointer"
                @click="editProduct(product)"
                data-bs-toggle="modal"
                data-bs-target="#editProductModal"
              >
                <font-awesome-icon icon="fa-solid fa-pen-to-square" />
              </div>
            </td>
            <td>
              <div class="cursor-pointer" @click="delProduct(product)">
                <font-awesome-icon icon="fa-solid fa-trash-can" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- 建立產品pop -->
  <AddproductModal
    :addProduct="addProduct"
    :addCheckBool="addCheckBool"
  ></AddproductModal>

  <!-- 修改產品pop -->
  <EditproductModal
    :confirmeditProduct="confirmeditProduct"
    :editCheckBool="editCheckBool"
    :productTmpData="productTmpData"
  ></EditproductModal>
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";

td {
  text-align: center;
  border-bottom: 1px solid $gray-700;
  padding: 12px;
}
</style>

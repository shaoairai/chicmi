import { ref, computed } from "vue";
import { defineStore } from "pinia";
// import axios from 'axios'

export const cartStore = defineStore("cart", {
  state: () => {
    return {
      // 所有產品
      products: {},
      // 購物車列表
      productList: [],
      // 運費
      deliveryFee: 100,
      // 費用總和
      totalPrice: 0,
    };
  },
  actions: {
    // // 取得產品列表
    // getProducts() {
    //   const conf = {
    //     method: 'GET',
    //     url: `${import.meta.env.VITE_APP_URL}v2/api/${import.meta.env.VITE_APP_PATH}/admin/products/all`,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `${this.token}`,
    //     }
    //   }
    //   axios(conf).then((res) => {
    //     console.log(res);
    //     // 存放所有產品
    //     const saveData = cartStore();
    //     saveData.saveProducts(res.data.products);
    //   }).catch((err) => {
    //     console.log(err.response);
    //   })
    // },

    saveProducts(products) {
      this.products = products;
      console.log(this.products);
    },

    // 如果 localStorage 有資料，就存放
    // 3. 直接可執行
    setProductList(storedCart) {
      this.productList = storedCart;
    },

    /* 加入購物車 */
    addToCart(product) {
      const obj = {
        id: product.id,
        img: product.imageUrl,
        name: product.title,
        price: product.price,
        number: 1,
      };
      this.productList.push(obj);
      console.log(this.productList);
      // 存到 localStorage
      localStorage.setItem("cart", JSON.stringify(this.productList));
    },

    /* 購物車內的函式 */
    // 數量 +1
    plusProduct(product) {
      this.productList.forEach((item, i) => {
        if (item.id === product.id) {
          this.productList[i].number += 1;
        }
      });
      // 存到 localStorage
      localStorage.setItem("cart", JSON.stringify(this.productList));
    },
    // 數量 -1
    minusProduct(product) {
      this.productList.forEach((item, i) => {
        if (item.id === product.id) {
          if (this.productList[i].number > 1) {
            this.productList[i].number -= 1;
          }
        }
      });
      // 存到 localStorage
      localStorage.setItem("cart", JSON.stringify(this.productList));
    },
    // 刪除品項
    delProduct(product) {
      this.productList.forEach((item, i) => {
        if (item.id === product.id) {
          this.productList.splice(i, 1);
        }
      });
      // 存到 localStorage
      localStorage.setItem("cart", JSON.stringify(this.productList));
    },
  },
  getters: {
    calcTotal(store) {
      const { deliveryFee } = store;
      let total = 0;
      this.productList.forEach((item) => {
        total += item.price * item.number;
      });
      return total + deliveryFee;
    },
  },
});

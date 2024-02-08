import { ref, computed } from "vue";
import { defineStore } from "pinia";
// import axios from 'axios'

export const cartStore = defineStore("cart", {
  state: () => {
    return {
      // 所有產品
      products: {
        "-NdszEpsHc5Ukz12UPJ3": {
          category: "點心",
          content: "莓果、蛋、奶油",
          description: "新鮮現採莓果，搭配鬆軟口感的蛋糕，美味無限！",
          id: "-NdszEpsHc5Ukz12UPJ3",
          imageUrl:
            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
          imagesUrl: ["", "", "", "", ""],
          is_enabled: 1,
          origin_price: 180,
          price: 150,
          title: "莓果蛋糕",
          unit: "片",
        },
        "-NdszodZ9a6Fsx4zxerJ": {
          category: "披薩",
          content: "蝦、魚、貝類、蟹肉、番茄醬",
          description:
            "每一口都是深海鮮香與脆嫩的完美結合，讓您的味蕾沉浸在美味的海洋饗宴中，品味海洋的美味！",
          id: "-NdszodZ9a6Fsx4zxerJ",
          imageUrl:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1981&q=80",
          is_enabled: 1,
          origin_price: 280,
          price: 280,
          title: "海鮮披薩",
          unit: "片",
        },
        "-Ndt-JhkOUNBHFfGNGn9": {
          category: "美味餐盤",
          content: "番茄、酪梨、南瓜、彩椒",
          description:
            "這一整碗綠意盎然的蔬菜令人心曠神怡！多種色彩繽紛的蔬菜，經過精心烹調，每一口都散發著清新的香氣，是健康與美味的完美結合。",
          id: "-Ndt-JhkOUNBHFfGNGn9",
          imageUrl:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          is_enabled: 1,
          origin_price: 270,
          price: 270,
          title: "蔬果拼盤",
          unit: "碗",
        },
        "-Ndt-w7ayE5JQ-uoqEuc": {
          category: "美味餐盤",
          content: "火腿、牛肉、起司",
          description:
            "細嫩的牛肉與熟成的火腿完美融合，肉汁四溢，加上濃郁的起司，夾在鬆軟的漢堡包中，每一口都是美味和滿足的保證，讓您享受最精緻的漢堡饗宴。",
          id: "-Ndt-w7ayE5JQ-uoqEuc",
          imageUrl:
            "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1922&q=80",
          imagesUrl: ["", "", "", "", ""],
          is_enabled: 1,
          origin_price: 270,
          price: 250,
          title: "雙料漢堡",
          unit: "份",
        },
        "-Ndt0LTpJUio35tkktD4": {
          category: "飲料",
          content: "Oreo 巧克力、牛奶",
          description:
            "這款濃郁的飲品結合了 Oreo 餅乾的香甜和巧克力的濃郁，打造出一種獨特的口感和風味。每一口都充滿了甜蜜的滋味，是甜品愛好者的絕佳選擇！",
          id: "-Ndt0LTpJUio35tkktD4",
          imageUrl:
            "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1854&q=80",
          imagesUrl: ["", "", "", "", ""],
          is_enabled: 1,
          origin_price: 130,
          price: 120,
          title: "Oreo 巧克力奶昔",
          unit: "杯",
        },
      },
      // 購物車列表
      productList: [],
      // 運費
      deliveryFee: 100,
      // 費用總和
      totalPrice: 0,
    };
  },
  actions: {
    saveProducts(products) {
      this.products = products;
      // console.log(this.products);
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
      // console.log(this.productList);
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

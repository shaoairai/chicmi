import { createRouter, createWebHashHistory } from "vue-router";
import MainView from "../views/front/MainView.vue";
import HomeView from "../views/front/HomeView.vue";
import LoginView from "../views/login/LoginView.vue";
import AboutView from "../views/front/AboutView.vue";
import ProductsView from "../views/front/ProductsView.vue";
import ProductView from "../views/front/ProductView.vue";
import CartView from "../views/front/CartView.vue";
import ContactView from "../views/front/ContactView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "login",
    //   component: LoginView,
    // },
    {
      path: "/",
      name: "main",
      component: MainView,
      children: [
        {
          path: "home",
          name: "home",
          component: HomeView,
        },
        {
          path: "about",
          name: "about",
          component: AboutView,
        },
        {
          path: "products",
          name: "products",
          component: ProductsView,
        },
        {
          path: "products",
          name: "products",
          component: ProductsView,
        },
        {
          path: "product/:id",
          name: "product",
          component: ProductView,
        },
        {
          path: "cart",
          name: "cart",
          component: CartView,
          // component: () => import("../views/front/CartView.vue"),
        },
        {
          path: "contact",
          name: "contact",
          component: ContactView,
          // component: () => import("../views/front/ContactView.vue"),
        },
      ],
    },
    // {
    //   path: "/home",
    //   name: "home",
    //   component: HomeView,
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   component: AboutView,
    //   // component: () => import("../views/front/AboutView.vue"),
    // },
    // {
    //   path: "/products",
    //   name: "products",
    //   component: ProductsView,
    //   // component: () => import("../views/front/ProductsView.vue"),
    // },
    // {
    //   path: "/product/:id",
    //   name: "product",
    //   component: ProductView,
    //   // component: () => import("../views/front/ProductView.vue"),
    // },
    // {
    //   path: "/cart",
    //   name: "cart",
    //   component: CartView,
    //   // component: () => import("../views/front/CartView.vue"),
    // },
    // {
    //   path: "/contact",
    //   name: "contact",
    //   component: ContactView,
    //   // component: () => import("../views/front/ContactView.vue"),
    // },
  ],
});

export default router;

import { createRouter, createWebHashHistory } from "vue-router";
import MainView from "../views/front/mainview/MainView.vue";
import HomeView from "../views/front/homeview/HomeView.vue";
import LoginView from "../views/login/LoginView.vue";
import AboutView from "../views/front/aboutview/AboutView.vue";
import ProductsView from "../views/front/productsview/ProductsView.vue";
import ProductView from "../views/front/productview/ProductView.vue";
import CartView from "../views/front/cartview/CartView.vue";
import ContactView from "../views/front/contactview/ContactView.vue";
import AdminView from "../views/admin/AdminView.vue";
import ProductsAdmin from "../views/admin/pages/ProductsAdmin.vue";

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
      redirect: "home",
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
        },
        {
          path: "contact",
          name: "contact",
          component: ContactView,
        },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      redirect: "plist",
      component: AdminView,
      children: [
        {
          path: "/login",
          name: "login",
          component: LoginView,
        },
        {
          path: "/plist",
          name: "plist",
          component: ProductsAdmin,
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

// 切頁面之後，卷軸都回到最頂端
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router;

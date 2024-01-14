import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import "./assets/all.scss";

import App from "./App.vue";
import router from "./router";

// VeeValidate import
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import * as AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUserSecret,
  faUtensils,
  faHandHoldingHeart,
  faBellConcierge,
  faMountainSun,
  faBuildingWheat,
  faMoneyBillTrendUp,
  faChampagneGlasses,
  faCirclePlus,
  faPenToSquare,
  faTrashCan,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons"; // 所有要嵌入的 icon 都要加在這裡

/* add icons to the library */
library.add(
  faUserSecret,
  faUtensils,
  faHandHoldingHeart,
  faBellConcierge,
  faMountainSun,
  faBuildingWheat,
  faMoneyBillTrendUp,
  faChampagneGlasses,
  faCirclePlus,
  faPenToSquare,
  faTrashCan,
  faArrowLeftLong
); // 所有要嵌入的 icon 都要加在這裡

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);

// VeeValidate
app.component("VForm", Form);
app.component("VField", Field);
app.component("ErrorMessage", ErrorMessage);

// 加入全部可用的驗證規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

// 多國語系
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale("zh_TW");

app.mount("#app");

// bootstrap-icons
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";

import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

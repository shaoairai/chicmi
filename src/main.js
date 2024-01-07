import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import "./assets/all.scss";

import App from "./App.vue";
import router from "./router";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserSecret, faUtensils,faHandHoldingHeart, faBellConcierge, faMountainSun ,faBuildingWheat,faMoneyBillTrendUp,faChampagneGlasses} from "@fortawesome/free-solid-svg-icons"; // 所有要嵌入的 icon 都要加在這裡

/* add icons to the library */
library.add(faUserSecret, faUtensils,faHandHoldingHeart, faBellConcierge, faMountainSun ,faBuildingWheat,faMoneyBillTrendUp,faChampagneGlasses); // 所有要嵌入的 icon 都要加在這裡

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount("#app");

// bootstrap-icons
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";

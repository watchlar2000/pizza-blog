import Antd from "ant-design-vue";
import Vue from "vue";
import App from "./App.vue";
// eslint-disable-next-line prettier/prettier
import "ant-design-vue/dist/antd.css";
import { createPinia, PiniaVuePlugin } from "pinia";

import router from "./router";

Vue.use(Antd);
Vue.use(PiniaVuePlugin);
const pinia = createPinia();

Vue.config.productionTip = false;

new Vue({
  router,
  pinia,
  render: (h) => h(App),
}).$mount("#app");

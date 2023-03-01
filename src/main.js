import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import Vue from "vue";
import VueQuillEditor from "vue-quill-editor";
import App from "./App.vue";

import { createPinia, PiniaVuePlugin } from "pinia";

import router from "./router";

Vue.use(VueQuillEditor);
Vue.use(Antd);
Vue.use(PiniaVuePlugin);
const pinia = createPinia();

Vue.config.productionTip = false;

new Vue({
  router,
  pinia,
  render: (h) => h(App),
}).$mount("#app");

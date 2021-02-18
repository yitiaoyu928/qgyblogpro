import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import {Button, Input, Header, Aside, Main, Footer, Container} from 'element-ui'
import tabBar from "./components/tabBar/tabBar.vue";
import content from "./components/content/content.vue";
import aisde from './components/aside/aside.vue';
import commonHeader from "./components/common-header/commonHeader.vue";
import router from "./router/router.js";
import store from "./vuex/store.js";

Vue.config.productionTip = false
Vue.component('my-button', Button)
Vue.component('my-header', Header)
Vue.component('my-aside', Aside)
Vue.component('my-main', Main)
Vue.component('my-footer', Footer)
Vue.component("my-container", Container)
Vue.component("my-input", Input);
Vue.component("tab-bar", tabBar)
Vue.component("my-content", content)
Vue.component("aisder", aisde)
Vue.component("common-header", commonHeader);
Vue.directive("loading", {
  bind(el, binding) {
    if (binding.arg) {
      let div = document.createElement("div");
      div.id = "mask";
      div.style.position = "absolute";
      div.style.backgroundColor = "rgba(255,255,255,0.7)";
      div.style.top = "0";
      div.style.right = "0";
      div.style.bottom = "0";
      div.style.left = "0";
      div.style.textAlign = "center";
      div.textContent = "显示中。。。。。";
      el.appendChild(div);
    }
  },
  update(el, binding) {
    if (!binding.arg) {
      let div = document.getElementById("mask");
      el.removeChild(div);
    } else {
      let div = document.createElement("div");
      div.id = "mask";
      div.style.position = "absolute";
      div.style.backgroundColor = "rgba(255,255,255,0.7)";
      div.style.top = "0";
      div.style.right = "0";
      div.style.bottom = "0";
      div.style.left = "0";
      div.style.textAlign = "center";
      div.textContent = "显示中。。。。。";
      el.appendChild(div);
    }
  }
})
import axios from "axios";

Vue.prototype.$axios = axios;
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

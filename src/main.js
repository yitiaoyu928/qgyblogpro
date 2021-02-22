import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import {Button, Input, Header, Aside, Main, Footer, Container} from 'element-ui'
import tabBar from "./components/tabBar/tabBar.vue";
import content from "./components/content/content.vue";
import aisde from './components/aside/aside.vue';
import commonHeader from "./components/common-header/commonHeader.vue";
import videoPlay from "./components/video/video-play.vue";
import leaveDialog from "./components/article-leave-word-submit/article-dialog.vue";
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
Vue.component("video-play",videoPlay);
Vue.component("leave-dialog",leaveDialog)
// 全局loading加载
Vue.directive("loading", {
  update(el, binding) {
    if (!binding.arg) {
      let div = document.getElementById("mask");
      el.removeChild(div);
    } else {
      let div = document.createElement("div");
      let i = document.createElement("i");
      i.className = "iconfont icon-loading loading";
      i.style.position="absolute";
      i.style.left = "50%";
      i.style.top = "50%";
      i.style.transform="translate(-50%,-50%)";
      div.appendChild(i);
      div.id = "mask";
      div.style.position = "absolute";
      div.style.top = "50%";
      div.style.left = "50%";
      div.style.transform = "translate(-50%,-50%)";
      div.style.backgroundColor = "rgba(255,255,255,0.7)";
      div.style.height = "300px";
      div.style.width = "400px";
      div.style.border = "1px solid #ccc";
      div.style.borderRadius = "5px";
      div.style.boxShadow = "0px 1px 3px #ccc"
      // 添加loading样式
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

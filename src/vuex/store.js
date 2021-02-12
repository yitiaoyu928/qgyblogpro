import Vue from 'vue';
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
const store = new Vuex.Store({
  state:{
    article_list:[]
  },
  actions:{
    getArticleList(context) {
      axios.get("http://www.qgy.com/getArticleList.php").then(res => {
        context.state.article_list = res.data;
      })
    }
  }
})
export default store;
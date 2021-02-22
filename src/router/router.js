import Vue from "vue"
import VueRouter from "vue-router"
import AppIndex from "../components/index/index.vue";
import Content from "../components/content/content.vue";
import Operation from "../components/user-operation/operation.vue";
import logins from "../components/login/login.vue";
import register from "../components/register/register.vue";
import articleInfo from "@/components/article-info/articleInfo";
import editUser from "@/components/user-info/user-info.vue";
import leaveWord from "@/components/leave-list/leave-list.vue";

let routes = [
  {
    path: '/',
    component: AppIndex,
    alias: "/index",
    children: [
      {
        path: "/",
        component: Content
      },
      {
        path: "/info/:id",
        component: articleInfo
      },
      {
        path: "/edit",
        component: editUser
      }
      ,
      {
        path: "/leaveword",
        component: leaveWord
      }
    ]
  },
  {
    path: "/operation",
    component: Operation,
    alias: "/operation/login",
    children: [
      {
        path: "login",
        component: logins
      },
      {
        path: "register",
        component: register
      }
    ]
  }
]
let router = new VueRouter({
  routes
});
Vue.use(VueRouter)
export default router
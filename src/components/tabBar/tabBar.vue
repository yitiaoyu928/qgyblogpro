<template>
  <div class="tab-bar">
    <div class="tab-logo">
      <router-link to="/">
        <h1 class="logo"></h1>
      </router-link>
    </div>
    <div class="tab-search">
      <div class="search-component">
        <my-input class="my-input" v-model="searchInfo" placeholder="请输入内容"></my-input>
        <my-button icon="el-icon-search" type="primary" plain @click="searchContent">搜索</my-button>
      </div>
    </div>
    <div class="tab-login">
      <logins v-if="login"></logins>
      <un-logins v-else></un-logins>
    </div>
  </div>
</template>

<script>
import logins from "../operation-component/user-login";
import unLogins from "../operation-component/user-unlogin.vue";

export default {
  name: "tabBar",
  data() {
    return {
      searchInfo: "",
      login: false
    }
  },
  components: {
    "logins": logins,
    "un-logins": unLogins
  },
  created() {
    if(sessionStorage.getItem("user")) {
      this.login = true;
    }
  },
  methods:{
    async searchContent() {
     let {data} = await this.$axios.get("http://www.qgy.com/searchContent.php",{
        params:{
          search_info:this.searchInfo
        }
      });
      console.log(data);
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-bar {
  display: flex;

  .tab-logo {
    .logo {
      margin: 0;
      padding: 0;
      width: 120px;
      height: 60px;
      background-image: url("../../../public/logo.png");
      background-repeat: no-repeat;
    }
  }

  .tab-search {
    flex-grow: 7;
    display: flex;
    justify-content: center;
    align-items: center;

    .search-component {
      > .my-input {
        width: 60%;
      }
    }

  }

  .tab-login {
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
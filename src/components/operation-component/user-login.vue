<template>
  <div class="user-login" @mouseenter="listShow($event)" @mouseleave="removeListActive">
    <div class="user-avert"
         :style="{backgroundImage:'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnltfxyRHuEEUE4gIZp9fr77Q8goigP7mQ6Q&usqp=CAU)'}"
    ></div>
    <ul class="user-info-list" ref="userInfoList">
      <li class="user-info-li">用户信息</li>
      <li class="user-info-li">留言记录</li>
      <li class="user-info-li" @click="logOut">退出登录</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "user-login",
  data() {
    return {
      urls:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnltfxyRHuEEUE4gIZp9fr77Q8goigP7mQ6Q&usqp=CAU"
    }
  },
  methods:{
    listShow(e) {
      switch(e.type) {
        case "mouseenter":
          this.setListActive();
          break;
          // case "mouseleave":
          //   this.removeListActive();
          //   break;
      }
    },
    setListActive() {
      this.$refs.userInfoList.style.display = "block";
      setTimeout(()=>{
        this.$refs.userInfoList.style.opacity = 1;
      },300)
    },
    removeListActive() {
      this.$refs.userInfoList.style.opacity = 0;
      setTimeout(()=>{
        this.$refs.userInfoList.style.display = "none";
      },300)
    },
    logOut() {
      sessionStorage.removeItem("flags");
      this.$router.go(0);
    }
  }
}
</script>

<style lang="scss" scoped>
.user-login {
  margin-top: -5px;
  position: relative;
  z-index: 10;
  .user-info-list {
    border-top: 30px solid transparent;
    position: absolute;
    top: 30px;
    width: 100px;
    list-style: none;
    padding: 0;
    margin: 0;
    z-index: -1;
    background-color: #666;
    text-align: center;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    transition: 0.3s;
    display: none;
    .user-info-li {
      padding: 5px;
      &:hover {
        background-color: #999999;
      }
    }
  }
  &:hover .user-info-list{
    display: block;
  }
  .user-avert {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
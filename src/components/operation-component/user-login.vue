<template>
  <div class="user-login" @mouseenter="listShow" @mouseleave="removeListActive">
    <div class="user-avert">
      <img :src="via" alt="头像错误">
    </div>
    <ul class="user-info-list" ref="userInfoList">
      <li class="user-info-li">
        <router-link to="/edit" class="edit-link">用户信息</router-link>
      </li>
      <li class="user-info-li">
        <router-link to="/leaveword" class="edit-link">留言记录</router-link>
      </li>
      <li class="user-info-li" @click="logOut">退出登录</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "user-login",
  data() {
    return {
      via: ""
    }
  },
  created() {
    this.via = JSON.parse(sessionStorage.getItem('user')).via;
  },
  methods: {
    listShow() {
      this.setListActive();
    },
    // 设置元素显示
    setListActive() {
      this.$refs.userInfoList.style.display = "block";
      setTimeout(() => {
        this.$refs.userInfoList.style.opacity = 1;
      }, 300)
    },
    // 设置元素隐藏
    removeListActive() {
      this.$refs.userInfoList.style.opacity = 0;
      setTimeout(() => {
        this.$refs.userInfoList.style.display = "none";
      }, 300)
    },
    logOut() {
      sessionStorage.removeItem("user");
      // 如果不是主页，退出则跳转到主页在刷新，否则直接刷新
      if (this.$route !== "/") {
        this.$router.push("/");
        this.$router.go(0);
      } else {
        this.$router.go(0);
      }

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
    border: 1px solid rgb(175, 238, 238);
    position: absolute;
    top: 30px;
    width: 100px;
    list-style: none;
    padding: 0;
    padding-top: 30px;
    margin: 0;
    z-index: -1;
    background-color: rgb(255, 255, 255);
    text-align: center;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    transition: 0.3s;
    display: none;

    .user-info-li {
      padding: 5px;
      &:hover {
        cursor: pointer;
        background-color: rgb(176, 196, 222);
      }
      .edit-link {
        text-decoration: none;
        color: #333;
      }
    }
  }

  &:hover .user-info-list {
    display: block;
  }

  .user-avert {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;

    > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
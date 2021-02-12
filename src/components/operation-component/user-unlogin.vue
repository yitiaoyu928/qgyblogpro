<template>
  <div class="user-unlogins">
    <router-link to="/operation/login" class="login-register">登录</router-link>
    <router-link to="/operation/register" class="login-register">注册</router-link>
  </div>
</template>

<script>
export default {
  name: "user-unlogin"
}
</script>

<style lang="scss" scoped>
.user-unlogins {
  .login-register {
    padding: 0 5px;
    text-decoration: none;
    color: #999;
    &:hover {
      color:#666;
    }
  }
}
</style>
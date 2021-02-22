<template>
  <div id="app">
    <transition name="transform-left">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    // 触发Vuex异步事件，获取全部文章
    this.$store.dispatch("getArticleList");
  }
}
</script>

<style lang="scss" scoped>
#app {
  position: relative;
}
.transform-left-enter,.transform-left-leave-to{
  transform: translateX(-100%);
  opacity: 0;
}
.transform-left-enter-active,.transform-left-leave-active {
  position: absolute;
  transition: all 0.5s;
}

</style>

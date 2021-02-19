<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    // 触发Vuex异步事件
    this.$store.dispatch("getArticleList")
  }
}
</script>

<style lang="scss" scoped>

</style>

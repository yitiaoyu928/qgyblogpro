<template>
  <div id="app">
    <router-view></router-view>
    <button @click="show = !show">显示浮层</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    this.$store.dispatch("getArticleList")
  },
  data() {
    return {
      show:true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div class="operation">
    <common-header></common-header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "operation"
}
</script>

<style lang="scss" scoped>
.operation {
  min-width: 960px;
}
</style>
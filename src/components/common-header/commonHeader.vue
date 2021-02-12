<template>
  <div class="common-header">
    <router-link to="/">
      <h1></h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "commonHeader"
}
</script>

<style lang="scss" scoped>
.common-header {
   h1 {
    background-image: url(../../../public/logo.png);
    padding: 30px 0;
    width: 120px;
  }
}
</style>
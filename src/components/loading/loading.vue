<template>
  <div class="loadings">
    <i :class="[icon,'loading']" class="i-loading"></i>
  </div>
</template>

<script>
export default {
name: "loading",
  props:{
    icon:{
      type:String,
      default:"iconfont icon-loading"
    }
  }
}
</script>

<style lang="scss" scoped>
  .loadings {
    position: absolute;
    top: 50%;
    left:50%;
    transform:translate(-50%,-50%);
    background-color: rgba(255,255,255,0.7);
    height: 300px;
    width: 400px;
    border: 1px solid #ccc;
    border-radius: 5px;
    .i-loading {
      position: absolute;
      top: 50%;
      left:50%;
      transform:translate(-50%,-50%);
      font-size: 28px;
    }
  }
</style>
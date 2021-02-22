<template>
  <div class="app-index">
    <my-container class="container-body">
      <my-header class="app-header">
        <tab-bar></tab-bar>
      </my-header>
      <my-container>
        <my-main class="main-content">
          <transition name="content-transform">
            <router-view></router-view>
          </transition>
        </my-main>
        <my-aside width="200px" class="app-aside">
          <aisder></aisder>
        </my-aside>
      </my-container>
      <my-footer class="app-footer">footer</my-footer>
    </my-container>
  </div>
</template>

<script>
export default {
  name: "index",
  created() {

  }
}
</script>

<style lang="scss" scoped>
.app-index {
  max-width: 1200px;
  min-width: 960px;

  .container-body {
    flex-direction: column;

    .app-header {
      border-bottom: 1px solid #ccc;
    }

    .app-aside {
      //border-left: 1px solid #ccc;
    }

    .main-content {
      min-height: 600px;
      overflow-y: hidden;
      .content-transform-enter,.content-transform-leave-to {
        transform:translateY(-100%);
        opacity: 0;
      }
      .content-transform-enter-active,.content-transform-leave-active {
        transition: all 0.5s;
      }
    }

    .app-footer {
      border-top: 1px solid #ccc;
    }
  }
}
</style>
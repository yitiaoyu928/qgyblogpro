<template>
  <div class="aside">
    <div class="close-aside">
      <i :class="['iconfont','large-size',{'icon-menu':hide,'icon-close':!hide}]"
         @click="toggleShow"></i>
    </div>
    <transition name="hide">
      <div class="aside-list" v-show="!hide">
        <ul class="list-ul">
          <li class="list-li" v-for="link in menuList" :key="link.id">
            <div class="link-box">
              <i :class="[link.iconfont]" :style="{fontSize:'18px'}"></i>
              <router-link :to="/menu/+link.title" class="index-link">{{link.title}}</router-link>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "my-aside",
  data() {
    return {
      hide: false,
      menuList: []
    }
  },
  created() {
    this.getMenuList();
  },
  methods: {
    toggleShow() {
      this.hide = !this.hide;
    },
    async getMenuList() {
      let {data} = await this.$axios.get("http://www.qgy.com/getMenuList.php");
      this.menuList = data;
    }
  }
}
</script>
<style scoped lang="scss">
.aside {
  position: relative;

  .close-aside {
    padding: 3px 5px;
    border-bottom: 3px solid #ccc;

    .large-size {
      font-size: 18px;
      cursor: pointer;
      box-shadow: 0 0 5px rgb(149, 165, 166);
    }
  }

  .aside-list {
    .list-ul {
      list-style: none;
      padding: 0;

      .list-li {
        padding: 10px 5px;
        margin: 5px 0;
        border: 3px solid #ccc;
        background-color: rgba(46, 204, 113, .5);

        &:hover {
          border-color: rgb(22, 160, 133);
        }

        .link-box {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .index-link {
            text-decoration: none;
            color: #fff;
            text-align: center;
            font-size: 18px;
            flex-grow: 1;
            flex-shrink: 0;

            &:hover {
              color: #666;
            }
          }
        }

      }
    }
  }
}

.hide-enter, .hide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.hide-enter-active, .hide-leave-active {
  transition: all 0.5s;
}
</style>
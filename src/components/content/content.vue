<template>
  <div class="content">
    <transition-group class="list-ul" name="tg" tag="ul" mode="in-out">
      <li v-for="item in $store.state.article_list" :key="item.id" class="list-li">
        <router-link :to="/info/+item.id" class="article-link">
          <div class="title-container">
            <div class="title">{{item.title}}</div>
            <div class="introduction">{{item.describe}}</div>
          </div>
          <div class="describe">
            <div class="classify">{{item.classify}}</div>
            <div class="date">{{item.date_time | formatTimes}}</div>
          </div>
          <div class="image" :style="{backgroundImage:'url('+item.bg_image+')'}"></div>
        </router-link>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "contents",
  filters: {
    formatTimes(val) {
      return val.split(" ")[0];
    }
  },
}
</script>

<style lang="scss" scoped>
$bgColor: rgba(244, 245, 243, 0.5);
.content {
  .list-ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .list-li {
      flex-grow: 1;
      flex-shrink: 0;
      padding: 0;
      margin-top: 5px;
      margin-bottom: 5px;
      margin-left: 10px;
      width: 200px;
      min-height: 100px;
      border-radius: 5px;
      box-shadow: 0 0 5px #ccc;
      overflow: hidden;
      position: relative;
      .article-link {
        text-decoration: none;
        color: #333;
      }
      .image {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #ccc;
        z-index: -1;
        transition: all 0.5s;
      }

      &:hover .image {
        transform: scale(1.5);
      }

      &:hover .title-container {
        opacity: 1;
      }

      &:hover .describe {
        opacity: 1;
        transform: translateY(0);
      }

      .title-container {
        margin-top: 30px;
        text-align: center;
        opacity: 0;
        transition: opacity 0.5s;
        background-color: $bgColor;
      }

      .describe {
        display: flex;
        justify-content: space-around;
        opacity: 0;
        transform: translateY(100%);
        transition: 0.5s;
        background-color: $bgColor;
      }
    }
  }

  .tg-enter, .tg-leave-to {
    opacity: 0;
    transform: scale(0) translateY(-100%);
  }

  .tg-enter-active, .tg-leave-active {
    transition: all 0.5s;
  }
}
</style>
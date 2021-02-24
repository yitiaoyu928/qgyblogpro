<template>
  <div class="search">
    <transition-group name="trans" appear tag="ul" class="search-ul">
      <li v-for="list in search_list"
          :key="list.id"
          class="search-li"
          :style="{transitionDelay:'0.'+list.id+'s'}"
          :data-info-id="list.id"
          @click="goDetail(list.id)">
        <div class="article-img" :style="{backgroundImage:'url('+list.bg_image+')'}">
        </div>
        <div class="article-gather">
          <h3 class="title">{{list.title}}</h3>
          <div class="describe">{{list.describe}}</div>
          <div class="class-box">
            <span class="classify">{{list.classify}}</span>
            <span class="article-date">{{list.date_time}}</span>
          </div>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "search-content",
  data() {
    return {
      search_list: []
    }
  },
  created() {
    this.getSearchContent(this.$route.params.content);
  },
  methods: {
    async getSearchContent(text) {
      let {data} = await this.$axios.get("http://www.qgy.com/searchContent.php", {
        params: {
          search_info: text
        }
      });
      if (data.length > 0) {
        this.search_list = data;
      }
    },
    goDetail(infoId) {
      this.$router.push({path: '/info/' + infoId})
    }

  },
  watch: {
    $route(to) {
      let {params: val} = to;
      this.getSearchContent(val.content);
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  .search-ul {
    list-style: none;
    padding: 0;
    .search-li {
      display: flex;
      align-items: center;
      margin: 10px 0;
      position: relative;
      cursor: pointer;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background-color: rgb(46, 204, 113);
        transition: 0.3s;
      }

      &:hover::after {
        width: 100%;
      }

      .article-img {
        width: 100px;
        height: 100px;
        margin-right: 10px;
        border: 1px solid #ccc;
      }

      .article-gather {
        flex-grow: 1;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;

        .title {
          margin: 0;
          flex: 1;
        }

        .describe {
          flex: 4;
          padding: 10px 0;
        }

        .class-box {
          flex: 1;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }

  .trans-enter, .trans-leave-to {
    transform: translateX(120%);
  }

  .trans-enter-active, .trans-leave-active {
    transition: all 0.5s;
  }
}
</style>
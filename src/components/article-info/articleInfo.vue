<template>
  <div class="article-info" v-loading:[show]>
    <div class="article-box">
      <div class="title-box">
        <h2 class="article-title">这是文章的标题</h2>
        <div class="article-infos">
          <span class="article-classify">{{article_list.classify}}</span><span class="article-date">{{article_list.date_time | formatDate}}</span>
        </div>
      </div>
      <div class="article-content" v-html="article_content">

      </div>
    </div>
    <div class="leave-word">
      <leave-word @leaveLoading="leaveLoading"></leave-word>
    </div>
  </div>
</template>

<script>
import leaveWord from "../article-leave-word/articleLeaveWord.vue";

export default {
  name: "articleInfo",
  data() {
    return {
      article_content: "",
      id: this.$route.params.id,
      article_list: {},
      show: false,
      leaveLoadingSuccess: false,
    }
  },
  created() {
    this.getStoreInfo();
  },
  mounted() {
    // 用户留言以及文章信息列表同时加载成功，才能关闭浮层
    this.getArticleInfo();
  },
  filters: {
    formatDate(val) {
      return val.split(" ")[0];
    }
  },
  methods: {
    // 获取详细文章内容
    async getArticleInfo() {
      this.show = true;
      let {data} = await this.$axios({
        url: "http://www.qgy.com/getArticleInfo.php",
        method: "get",
        params: {
          article_id: this.$route.params.id
        }
      });
      this.article_content = this.replaceContent(data.article_content);
      if (this.article_content && this.leaveLoadingSuccess) {
        this.show = false;
      }
    },
    // 从vuex中获取以及存在的数据（分类以及日期）
    getStoreInfo() {
      let {classify, date_time} = this.$store.state.article_list[this.id - 1];
      this.article_list.classify = classify;
      this.article_list.date_time = date_time;
    },
    // 修改浮层显示情况
    leaveLoading(val) {
      this.leaveLoadingSuccess = val;
    },
    replaceContent(val) {
      let replaceURL = /(http|https):\/\/([\w-_/]+\.)*[\w]*/;
      let replaceImage = /\[image\]/;
      let urls = "";
      if(replaceURL.test(val)) {
        urls = val.match(replaceURL)[0];
        console.log(urls)
      }
      let newVal = val.replace(replaceImage, "<img src='" + urls + "'><br/>").replace(/-(http|https):\/\/([\w-_/]+\.)*[\w]*-/,"");
      return newVal;
    }
  },
  components: {
    "leave-word": leaveWord
  }
}
</script>

<style lang="scss" scoped>
.article-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  .article-box {
    flex-grow: 11;
  }

  .title-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .article-infos {
      display: flex;
      justify-content: space-between;
      position: relative;

      .article-classify, .article-date {
        padding: 0 10px;
      }

      .article-classify {
        position: relative;
        width: 30px;

        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          width: 1px;
          height: 16px;
          background-color: #999;
        }
      }
    }
  }

  .article-content {
    align-self: flex-start;
    margin-bottom: 40px;
  }

  .leave-word {
    flex-grow: 0;
  }
}
</style>
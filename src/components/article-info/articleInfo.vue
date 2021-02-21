<template>
  <div class="article-info" v-loading:[show]>
    <div class="article-box">
      <div class="title-box">
        <h2 class="article-title">{{title}}</h2>
        <div class="article-infos">
          <span class="article-classify">{{article_list.classify}}</span>
          <span class="article-date">{{article_list.date_time | formatDate}}</span>
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
      title: "",
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
      this.title = data.article_title;
      this.article_content = this.replaceContent(data.article_content);
      if (this.article_content && this.leaveLoadingSuccess) {
        this.show = false;
      }
    },
    // 从vuex中获取以及存在的数据（分类以及日期）
    getStoreInfo() {
      let {classify, date_time} = JSON.parse(sessionStorage.getItem("article_list"))[this.id-1];
      this.article_list.classify = classify;
      this.article_list.date_time = date_time;
    },
    // 修改浮层显示情况
    leaveLoading(val) {
      this.leaveLoadingSuccess = val;
    },
    replaceContent(val) {
      // 全局正则
      // 找到全部含有[image]-的内容
      let replaceURL = /\[image\]-(http|https):\/\/([\w-_/]+\.)*[\w]*-/g;
      // 替换JS代码段正则
      let codeJS = /-js(.*?)-/g;
      // 局部正则
      let topoReplaceURL = /(http|https):\/\/([\w-_/]+\.)*[\w]*/;
      let topoCodeJS = /-js(.*?)-/
      // 是否存在URL
      // 是否需要替换成图片,并清除URL
      if (replaceURL.test(val)) {
        // "<img src='" + urls + "' style='width: 100%;'><br/>"
        let allImageURL = val.match(replaceURL);
        for(let i = 0;i<allImageURL.length;i++) {
          let x = allImageURL[i].match(topoReplaceURL);
          val = val.replace(allImageURL[i],"<img src='" + x[0] + "' style='width: 100%;'><br/>");
        }
      }
      // 全局替换含有-js ** -的内容
      if (codeJS.test(val)) {
        // 获取全部含有-js ** -的内容
        let allArray = val.match(codeJS);
        for(let i = 0;i<allArray.length;i++) {
          let x = allArray[i].match(topoCodeJS);
          val = val.replace(x[0],"<pre>" + x[1] + "</pre>")
        }
      }
      return val;
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
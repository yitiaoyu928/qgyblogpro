<template>
  <div class="article-leave-word">
    <transition-group name="leave-trans" tag="div">
      <div class="user" v-for="leaveInfo in leaveList" :key="leaveInfo.id">
        <div class="user-pic"><img :src="leaveInfo.user_pic" alt="显示错误"></div>
        <div class="user-leave">
          <h4 class="user-nick">{{leaveInfo.nick}}</h4>
          <p class="leave-word">{{leaveInfo.user_leave_content}}</p>
          <span class="leave-time">{{leaveInfo.user_leave_time | formatDate}}</span>
        </div>
      </div>
    </transition-group>
    <div class="leave-add" @click="addLeave" v-if="isEnd">
      加载剩余留言
    </div>
    <div class="leave-dialog">
      <leave-dialog place-holder="请输入留言内容" :len="50"></leave-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "articleLeaveWord",
  props: ["leaveLoading"],
  data() {
    return {
      leaveList: [],
      rows: 0,
      isEnd: true
    }
  },
  created() {
    this.getUserLeaveWord();
  },
  methods: {
    // 第一次获取用户留言列表
    async getUserLeaveWord() {
      let {data} = await this.$axios.get("http://www.qgy.com/getArticleLeave.php", {
        params: {
          article_id: this.$route.params.id,
          rows: this.rows
        }
      });
      if(Array.isArray(data)) {
        this.leaveList = data;
        this.isEnd = true;
        // 发生于Mounted
        this.$emit("leaveLoading", true)
      }else {
        this.isEnd = false;
        this.$emit("leaveLoading", true)
      }
    },
    // 点击加载列表后追加留言
    async addLeave() {
      // row的下一次分页长度就是上一次获取全部内容的长度
      this.rows = this.leaveList.length;
      let {data} = await this.$axios.get("http://www.qgy.com/getArticleLeave.php", {
        params: {
          article_id: this.$route.params.id,
          rows: this.rows
        }
      });
      // 将加载的内容与之前的留言合并
      this.leaveList = this.leaveList.concat(data);
      if (!this.leaveList[this.leaveList.length - 1]) {
        this.$message("已经加载完了所有消息");
        this.leaveList.pop();
        this.isEnd = false;
      }
    }
  },
  filters: {
    formatDate(val) {
      return val.split(" ")[0];
    }
  }
}
</script>

<style lang="scss" scoped>
.article-leave-word {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 0;
  .leave-trans-enter,.leave-trans-leave-to {
    opacity: 0;
    transform: translateY(-100%);
  }
  .leave-trans-enter-active,.leave-trans-leave-active {
    transition: all 0.7s;
  }
  .user {
    display: flex;
    flex-direction: row;
    margin: 10px 0;
    .user-pic {
      width: 50px;
      height: 50px;
      align-self: center;
      border-radius: 50%;
      border: 1px solid #999;
      overflow: hidden;
      >img {
        width: 100%;
        height: 100%;
      }
    }

    .user-leave {
      position: relative;
      width: 100%;

      .user-nick {
        margin-top: 0;
        margin-bottom: 10px;
      }

      .leave-word {
        margin-top: 0;
      }

      .leave-time {
        position: absolute;
        bottom: 0;
        right: 0px;
      }
    }
  }

  .leave-add {
    text-align: center;
    user-select: none;
    cursor: pointer;
    position: relative;
    margin-bottom: 10px;

    &:hover {
      color: #999;
      text-decoration: underline;
    }

    &::after {
      content: "";
      display: inline-block;
      margin-left: 5px;
      position: absolute;
      top: 8px;
      border: 10px solid transparent;
      border-top: 10px solid #000000;
    }

    &:hover::after {
      border-top-color: #999;;
    }
  }
}
</style>
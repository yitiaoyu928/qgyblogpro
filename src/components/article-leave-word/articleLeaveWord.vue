<template>
  <div class="article-leave-word">
    <div class="user" v-for="leaveInfo in leaveList" :key="leaveInfo.id">
        <div class="user-pic" :style="{backgroundImage:'url('+leaveInfo.user_pic+')'}"></div>
        <div class="user-leave">
          <h4 class="user-nick">{{leaveInfo.id}}</h4>
          <p class="leave-word">{{leaveInfo.user_leave_content}}</p>
          <span class="leave-time">{{leaveInfo.user_leave_time}}</span>
        </div>
    </div>
    <div class="leave-add">
      加载剩余留言
    </div>
  </div>
</template>

<script>
export default {
  name: "articleLeaveWord",
  props:["leaveLoading"],
  data() {
    return {
      leaveList:[

      ]
    }
  },
  created() {
    this.getUserLeaveWord();
  },
  methods:{
    async getUserLeaveWord() {
     let {data} = await this.$axios.get("http://www.qgy.com/getArticleLeave.php",{
       params: {
         article_id: this.$route.params.id
       }
     });
     this.leaveList = data;
     // 发生于Mounted
     this.$emit("leaveLoading",false)
    }
  }
}
</script>

<style lang="scss" scoped>
.article-leave-word {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .user {
    display: flex;
    flex-direction: row;
    .user-pic {
      width: 50px;
      height: 50px;
      align-self: center;
      border-radius: 50%;
      border: 1px solid #999;
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
    &:hover {
      color: #999;
      text-decoration: underline;
    }
    &::after {
      content:"";
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
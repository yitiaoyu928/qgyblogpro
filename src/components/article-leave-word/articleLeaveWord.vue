<template>
  <div class="article-leave-word">
    <div class="user" v-for="leaveInfo in leaveList" :key="leaveInfo.id">
        <div class="user-pic">{{leaveInfo.userPic}}</div>
        <div class="user-leave">
          <h4 class="user-nick">{{leaveInfo.username}}</h4>
          <p class="leave-word">{{leaveInfo.userLeaveWord}}</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "articleLeaveWord",
  data() {
    return {
      leaveList:[
        {
          id:1,
          userPic:"none",
          username:"七个鱼一号",
          userLeaveDate:"2018-9-10",
          userLeaveWord:"hello world"
        },
        {
          id:2,
          userPic:"none",
          username:"七个鱼二号",
          userLeaveDate:"2018-9-10",
          userLeaveWord:"hello world"
        },
        {
          id:3,
          userPic:"none",
          username:"七个鱼三号",
          userLeaveDate:"2018-9-10",
          userLeaveWord:"hello world"
        },
        {
          id:4,
          userPic:"none",
          username:"七个鱼四号",
          userLeaveDate:"2018-9-10",
          userLeaveWord:"hello world"
        }
      ]
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
      .user-nick {
        margin-top: 0;
        margin-bottom: 10px;
      }
      .leave-word {
        margin-top: 0;
      }
    }
  }
}
</style>
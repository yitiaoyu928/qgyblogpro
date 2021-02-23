<template>
  <div class="user-info">
    <div class="user-info-box">
      <h1 class="classify">用户信息</h1>
      <form>
        <label for="leave_id" class="label-box" hidden>
          <span class="user">文章ID</span>
          <input type="text" class="username" name="leave_id" id="leave_id" autocomplete="off"
                 v-model="article_id" disabled/>
        </label>
        <label for="nick" class="label-box">
          <span class="user">用户昵称</span>
          <input type="text" class="username" name="nick" id="nick" autocomplete="off"
                 v-model="nick" disabled/>
        </label>
        <label for="username" class="label-box">
          <span class="user">用户账号</span>
          <input type="text" class="username" name="username" id="username" disabled
                 v-model="username"/>
        </label>
        <label for="login-ip" class="label-box">
          <span class="user">留言内容</span>
          <input type="text" class="username" name="login-ip" id="login-ip"
                 v-model="article_content"/>
        </label>
        <label for="sign" class="label-box">
          <span class="user">留言时间</span>
          <input type="text" class="username sign" name="sign" id="sign" v-model="leave_time" disabled/>
        </label>
        <div class="submit-edit">
          <input type="submit" value="提交修改" @click.prevent="submitEdit">
        </div>
      </form>
    </div>
    <div class="close" @click="$emit('close',false)">
      <i class="iconfont icon-close"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-info",
  props: {
    leaveInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      article_id: "",
      username: "",
      article_content: "",
      leave_time: "",
      nick: "",

    }
  },
  created() {
    this.getLeaveInfo()
  },
  methods: {
    submitEdit() {

    },
    getLeaveInfo() {
      this.article_id = this.leaveInfo.article_id;
      this.username = this.leaveInfo.username;
      this.nick = this.leaveInfo.nick;
      this.article_content = this.leaveInfo.user_leave_content;
      this.leave_time = this.leaveInfo.user_leave_time;
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  width: 100%;
  padding: 30px 0;
  border: 1px solid #ccc;
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;

  .close {
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;

    &:hover {
      color: #666;
    }
  }

  .user-info-box {
    padding-left: 100px;

    .classify {
      text-indent: 32px;
      border-left: 5px solid #41B883;
    }

    .label-box {
      display: flex;
      align-items: stretch;
      padding: 10px 0;

      .username {
        width: 200px;
        padding-left: 10px;
        border-radius: 3px;
        margin-right: 5px;
        height: 30px;
        border: 1px solid rgb(155, 152, 156);
        outline: none;

        &:disabled {
          background-color: rgb(211, 211, 211);
        }

        &:focus {
          border: 1px solid rgb(135, 206, 235);
        }
      }

      .user {
        text-align: right;
        margin-right: 10px;
        line-height: 30px;
        width: 80px;
      }
    }

  }

  .submit-edit {
    padding-left: 120px;

    input[type=submit] {
      border: none;
      padding: 5px 10px;
      border: 1px solid rgb(135, 206, 235);
      background-color: transparent;
      transition: .3s;
      border-radius: 3px;
      outline: none;

      &:hover {
        background-color: rgb(135, 206, 235);
        box-shadow: 0 0 3px rgb(127, 255, 212);
        color: #fff;
      }

      &:focus {
        border: 1px solid rgb(192, 192, 192);
      }
    }
  }
}
</style>
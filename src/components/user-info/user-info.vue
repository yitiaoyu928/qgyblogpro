<template>
  <div class="user-info">
    <div class="user-info-box">
      <h1 class="classify">用户信息</h1>
      <form>
        <label for="nick" class="label-box">
          <span class="user">昵&nbsp;&nbsp;&nbsp;&nbsp;称</span>
          <input type="text" class="username" name="nick" id="nick" autocomplete="off" v-model="nick"/>
        </label>
        <label for="username" class="label-box">
          <span class="user">用户名</span>
          <input type="text" class="username" name="username" id="username" disabled v-model="username"/>
        </label>
        <label for="login-ip" class="label-box">
          <span class="user">登录地址</span>
          <input type="text" class="username" name="login-ip" id="login-ip" disabled v-model="loginIp"/>
        </label>
        <label for="sign" class="label-box">
          <span class="user">签&nbsp;&nbsp;&nbsp;&nbsp;名</span>
          <textarea type="text" class="username sign" name="sign" id="sign" v-model="sign"></textarea>
        </label>
        <div class="submit-edit">
          <input type="submit" value="提交修改" @click.prevent="submitEdit">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-info",
  data() {
    return {
      username:"",
      loginIp:"",
      nick:"",
      sign:"",
      id:""
    }
  },
  created() {
    this.getUserInfo();
  },
  methods:{
    async submitEdit() {
      let URLPrams = new URLSearchParams();
      URLPrams.append("nick",this.nick);
      URLPrams.append("id",this.id);
      URLPrams.append("signs",this.sign);
     let {data} =  await this.$axios({
        url:"http://www.qgy.com/userEdit.php",
        method:"post",
        data:URLPrams
      });
      alert(data);
    },
    getUserInfo() {
      let {username,login_ip,nick,signs,id} = JSON.parse(sessionStorage.getItem("user"))
      this.username = username;
      this.loginIp = login_ip;
      this.nick = nick;
      this.sign = signs;
      this.id = id;
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  height: 100%;
  border: 1px solid #ccc;

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
          background-color: rgb(211,211,211);
        }
        &:focus {
          border: 1px solid rgb(135, 206, 235);
        }
        &.sign {
          height: 80px;
          resize: none;
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
      border: 1px solid rgb(135,206,235);
      background-color: transparent;
      transition: .3s;
      border-radius: 3px;
      outline: none;
      &:hover {
        background-color: rgb(135,206,235);
        box-shadow: 0 0 3px rgb(127,255,212);
        color: #fff;
      }
      &:focus {
       border: 1px solid rgb(192,192,192);
      }
    }
  }
}
</style>
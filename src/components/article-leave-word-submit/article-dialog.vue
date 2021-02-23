<template>
  <div class="article-leave-dialog">
    <form>
      <label for="text-info" class="leave-word">
        <span class="lable">留言</span>
        <input type="text"
               name="text-info"
               id="text-info"
               class="text-info"
               :placeholder="placeHolder"
               v-model="leaveWord"
               autocomplete="off"
               @input="validatorText">
        <input type="submit" value="留一条" class="submit" @click.prevent="submitLeave">
      </label>
    </form>
  </div>
</template>

<script>
export default {
  name: "article-dialog",
  props: {
    placeHolder: {
      type: String
    },
    len: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      leaveWord: "",
      article_id:this.$route.params.id
    }
  },
  created() {

  },
  methods: {
    // 提交内容
    async submitLeave() {
      let URLParams=new URLSearchParams();
      let {id, username, via,nick} = this.getUserContent();
      URLParams.append("id",id);
      URLParams.append("username",username);
      URLParams.append("via",via);
      URLParams.append("nick",nick);
      URLParams.append("leaveContent",this.leaveWord);
      URLParams.append("article_id",this.article_id);
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = date.getDate();
      let issue = `${year}-${month}-${day}`;
      URLParams.append("leaveTime",issue);
      let {data} = await this.$axios({
        url: "http://www.qgy.com/leaveWord.php",
        method: "post",
        data: URLParams
      });
      console.log(data);
    },
    getUserContent() {
      // 用户ID，用户账号，用户昵称，留言时间，留言内容，用户头像

      let {id, username, via,nick} = JSON.parse(sessionStorage.getItem("user"));
      return {
        id,
        username,
        via,
        nick
      }
    },
    // 验证长度
    validatorText() {
      if (this.leaveWord.length > this.len) {
        console.error("长度超出限制");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.article-leave-dialog {
  .leave-word {
    height: 30px;
    display: flex;
    justify-content: space-around;
    align-items: stretch;

    .lable {
      line-height: 30px;
      text-align: center;
      flex-grow: 1;
      cursor: pointer;
    }

    .text-info {
      flex-grow: 10;
      padding-left: 10px;
      border-radius: 3px;
      margin-right: 5px;
      border: 1px solid rgb(155, 152, 156);
      outline: none;

      &:focus {
        border: 1px solid rgb(135, 206, 235);
      }
    }

    .submit {
      flex-grow: 1;
      border: none;
      border: 1px solid #ccc;
      border-radius: 3px;
      transition: all 0.3s;

      &:hover {
        background-color: rgb(220, 220, 220);
      }
    }
  }
}
</style>
<template>
  <div class="leave-list">
    <table class="leave-table">
      <thead>
      <th>ID</th>
      <th>文章ID</th>
      <th>用户账号</th>
      <th>用户昵称</th>
      <th>留言内容</th>
      <th>留言时间</th>
      <th>操作</th>
      </thead>
      <tbody>
      <tr v-for="item in leave_list" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.article_id}}</td>
        <td>{{item.username}}</td>
        <td>
          {{item.nick}}
        </td>
        <td>{{item.user_leave_content}}</td>
        <td>{{item.user_leave_time | formatDate}}</td>
        <td>
          <span @click="editLeaveWord($event)"
                class="operation" :data-id="item.id">修改</span> |
          <span @click="deleteLeaveWord($event)"
                class="operation" :data-id="item.id">删除</span>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="edit-dialog" v-if="edit_bool">
      <leave-dialog @close="close" :leaveInfo="leaveInfo"></leave-dialog>
    </div>
  </div>
</template>

<script>
import leaveDialog from "@/components/leave-list/leave-dialog.vue";

export default {
  name: "leave-list",
  data() {
    return {
      leave_list: [],
      edit_bool: false,
      leaveInfo: {}
    }
  },
  created() {
    this.getLeaveList();
  },
  methods: {
    editLeaveWord(e) {
      this.edit_bool = true;
      let id = e.target.dataset.id;
      let x = this.leave_list.filter(item => {
        return item.id === id;
      });
      this.leaveInfo = Object.assign({}, x[0]);
    },
    deleteLeaveWord(el) {
      el.target.parentNode.parentNode.remove();
    },
    async getLeaveList() {
      let {id} = JSON.parse(sessionStorage.getItem("user"));
      let {data} = await this.$axios.get("http://www.qgy.com//getUserLeaveList.php", {
        params: {
          user_id: id
        }
      });
      this.leave_list = data;
    },
    close(val) {
      this.edit_bool = val;
    }
  },
  filters: {
    formatDate(val) {
      return val.split(" ")[0];
    }
  },
  components: {
    "leave-dialog": leaveDialog
  }
}
</script>

<style lang="scss" scoped>
.leave-list {
  width: 100%;
  min-height: 400px;
  position: relative;

  .leave-table {
    width: 100%;
    border: 1px solid #ccc;
    border-collapse: collapse;

    th, td {
      min-width: 100px;
    }

    th {
      border: 1px solid #ccc;
    }

    td {
      border: 1px solid #ccc;
      text-align: center;

      .operation {
        cursor: pointer;

        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
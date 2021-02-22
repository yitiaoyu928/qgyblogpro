<template>
  <div class="leave-list">
    <table class="leave-table">
      <thead>
      <th>文章ID</th>
      <th>文章标题</th>
      <th>留言内容</th>
      <th>留言时间</th>
      <th>操作</th>
      </thead>
      <tbody>
      <tr v-for="item in fake_list" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.title}}</td>
        <td>
          {{item.article_content}}
        </td>
        <td>{{item.leave_time}}</td>
        <td>
          <span @click="editLeaveWord" class="operation">修改</span> | <span @click="deleteLeaveWord($event)" class="operation">删除</span>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="edit-dialog" v-if="edit_bool">
      <leave-dialog></leave-dialog>
    </div>
  </div>
</template>

<script>
import leaveDialog from "@/components/leave-list/leave-dialog.vue";
export default {
  name: "leave-list",
  data() {
    return {
      fake_list: [
        {
          id: "1",
          title: "留言文章标题",
          article_content: "你好啊",
          leave_time: "2018-9-01"
        },
        {
          id: "2",
          title: "留言文章标题",
          article_content: "你好啊你好啊你好啊你好啊",
          leave_time: "2018-9-02"
        },
        {
          id: "3",
          title: "留言文章标题",
          article_content: "你好啊你好啊你好啊你好啊",
          leave_time: "2018-9-03"
        }
      ],
      edit_bool:false
    }
  },
  methods:{
    editLeaveWord() {
      this.edit_bool = true;
    },
    deleteLeaveWord(el) {
      el.target.parentNode.parentNode.remove();
    }
  },
  components:{
    "leave-dialog":leaveDialog
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
        cursor:pointer;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
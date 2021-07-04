<template>
  <div class="msg-list">
    <table cellpadding="0" cellspacing="0">
      <thead>
        <th>留言ID</th>
        <th>留言者昵称</th>
        <th>内容</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="(item, i) in msgList">
          <td>{{ item.id }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.msg }}</td>
          <td class="operation">
            <el-button type="danger" @click="del(item.id)">删除</el-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as msgServ from "@/api/msg";
export default {
  data() {
    return {
      msgList: "",
    };
  },
  async created() {
    const resp = await msgServ.getAllMsg();
    this.msgList = resp.detail;
  },
  methods: {
    // 删除一条留言
    async del(id) {
      const resp = await msgServ.deleteMsg(id);
      if (resp.success) {
        this.$message({
          message: "删除成功",
          type: "success"
        })
        const resp = await msgServ.getAllMsg();
        this.msgList = resp.detail;
      }
    },
  },
};
</script>

<style scoped>
@import "~@/assets/css/table.css";
</style>
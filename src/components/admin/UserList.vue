<template>
  <div class="user-list">
    <table cellpadding="0" cellspacing="0">
      <thead>
        <th>ID</th>
        <th>学号</th>
        <th>姓名</th>
        <th>年龄</th>
        <th>省份</th>
        <th>登陆密码</th>
        <th>选座位置</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="(item, i) in userList">
          <td>{{ item.id }}</td>
          <td>{{ item.sno }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.province }}</td>
          <td>{{ item.password }}</td>
          <td>{{ item.position || "无" }}</td>
          <td class="operation">
            <el-button type="primary" @click="edit(item)">编辑</el-button>
            <el-button type="danger" @click="del(item.id)">删除</el-button>
          </td>
        </tr>
      </tbody>
    </table>
    <el-dialog title="学生信息" :visible.sync="dialogFormVisible">
      <el-form :model="userData">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input
            v-model="userData.sno"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="登录密码" :label-width="formLabelWidth">
          <el-input v-model="userData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="userData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="userData.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="省份" :label-width="formLabelWidth">
          <el-input v-model="userData.province" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选座信息" :label-width="formLabelWidth">
          <el-input
            v-model="userData.position"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as userServ from "@/api/user";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      userList: "",
      userData: {
        id: "",
        sno: "",
        name: "",
        age: "",
        province: "",
        password: "",
        position: "",
        count: "",
      },
    };
  },
  async created() {
    const resp = await userServ.getAllUser();
    this.userList = resp.detail.filter((it) => {
      return it.sno !== "admin";
    });
  },
  methods: {
    // 编辑用户信息
    edit(item) {
      this.dialogFormVisible = true;
      this.userData = item;
    },
    // 删除用户
    async del(id) {
      const resp = await userServ.delStu(id);
      if (resp.success) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        const resp = await userServ.getAllUser();
        this.userList = resp.detail;
      }
    },
    async commit() {
      this.dialogFormVisible = false;
      const resp = await userServ.updateUserIfo({
        ...this.userData,
      });
      if (resp.success) {
        this.$message({
          message: "修改成功",
          type: "success"
        });
      }
    },
  },
};
</script>

<style scoped>
@import "~@/assets/css/table.css";
.user-list {
  position: relative;
}
.edit-form {
  position: absolute;
  top: 20px;
  left: 50%;
  width: 50%;
  transform: translate(-50%, 0%);
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 1px 2px 3px #123456, -1px 2px 3px #123456, 0px -2px 3px #123456;
}
.edit-form p {
  display: flex;
  justify-content: center;
}
/* p label {
  flex-basis: 20%;
  text-align: right;
} */
/* p input {
  flex-basis: 70%;
  display: block;
  padding: 7px;
  border-radius: 4px 4px;
  font-size: 14px;
  color: #4d4d4d;
  border: 1px solid #ccc;
  background-color: #fff;
  background-image: none;
  outline-color: #4e6ef2;
} */
button.commit {
  font-size: 18px;
  background-color: #4e6ef2;
  color: #fff;
  border: none;
  padding: 5px 20px;
  border-radius: 10px;
  cursor: pointer;
}
div.cancel {
  position: absolute;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  right: 47%;
  bottom: 125px;
  transform: translate(-50%, 0);
  font-size: 30px;
  border-radius: 50%;
  background-color: #fff;
  color: #4e6ef2;
  cursor: pointer;
}
</style>
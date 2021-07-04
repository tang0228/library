<template>
  <div class="fee-list">
    <el-button type="primary" @click="dialogFormVisible = true" class="add"
      >新增座位</el-button
    >
    <table cellpadding="0" cellspacing="0">
      <thead>
        <th>座位ID</th>
        <th>楼层</th>
        <th>房间号</th>
        <th>座位号</th>
        <th>使用者</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="(item, i) in seatList">
          <td>{{ item.id }}</td>
          <td>{{ item.floor }}</td>
          <td>{{ item.roomId }}</td>
          <td>{{ item.deskId }}</td>
          <td>{{ item.userSno || "空闲中..." }}</td>
          <td class="operation">
            <el-button type="primary" @click="edit(item)">编辑</el-button>
            <el-button type="danger" @click="del(item)">删除</el-button>
          </td>
        </tr>
      </tbody>
    </table>
    <el-dialog title="座位信息" :visible.sync="dialogFormVisible">
      <el-form :model="seatData">
        <el-form-item label="楼层" :label-width="formLabelWidth">
          <el-input v-model="seatData.floor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房间号" :label-width="formLabelWidth">
          <el-input v-model="seatData.roomId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="座位号" :label-width="formLabelWidth">
          <el-input v-model="seatData.deskId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用者" :label-width="formLabelWidth">
          <el-input
            v-model="seatData.userSno"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="commit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as seatServ from "@/api/seat";
import * as userServ from "@/api/user";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      seatList: "",
      seatData: {
        id: "",
        floor: "",
        roomId: "",
        deskId: "",
        userSno: "",
      },
    };
  },
  async created() {
    const resp = await seatServ.getAllSeat();
    this.seatList = resp.detail;
  },
  methods: {
    edit(item) {
      if (item.userSno) {
        this.$message({
          message: "已经选择，不能修改",
          type: "warning",
        });
        return;
      }
      this.dialogFormVisible = true;
      this.seatData = item;
    },
    // 删除座位信息
    async del(item) {
      if (item.userSno) {
        this.$message({
          message: "使用中，不可删除!",
          type: "error",
        });
        return;
      }
      const resp = await seatServ.delSeat(item.id);
      if (resp.success) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        const resp = await seatServ.getAllSeat();
        this.seatList = resp.detail;
      }
    },
    // 确认修改或添加座位信息
    async commit() {
      if (this.seatData.id) {
        // 此处不可以修改使用者
        const resp = await seatServ.updateSeat({
          id: this.seatData.id,
          floor: this.seatData.floor,
          roomId: this.seatData.roomId,
          deskId: this.seatData.deskId,
          userSno: this.seatData.userSno,
        });
        if (resp.success) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        }
        this.cancel();
      } else {
        if (
          !this.seatData.floor ||
          !this.seatData.roomId ||
          !this.seatData.deskId
        ) {
          this.$message({
            message: "信息填写遗漏",
            type: "warning",
          });
          return;
        }
        const resp = await seatServ.addSeat({
          floor: this.seatData.floor,
          roomId: this.seatData.roomId,
          deskId: this.seatData.deskId,
          userSno: this.seatData.userSno,
        });
        if (resp.success) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          const resp = await seatServ.getAllSeat();
          this.seatList = resp.detail;
        }
        this.cancel();
      }
    },
    cancel() {
      this.dialogFormVisible = false;
      this.seatData = {
        id: "",
        floor: "",
        roomId: "",
        deskId: "",
        userSno: "",
      };
    },
  },
};
</script>

<style scoped>
@import "~@/assets/css/table.css";
.fee-list {
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
p label {
  flex-basis: 20%;
  text-align: right;
}
p input {
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
}
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
  right: 47.5%;
  transform: translateX(-50%);
  top: 295px;
  font-size: 30px;
  border-radius: 50%;
  background-color: #fff;
  color: #4e6ef2;
  cursor: pointer;
}
button.add {
  display: block;
  margin-bottom: 10px;
}
</style>
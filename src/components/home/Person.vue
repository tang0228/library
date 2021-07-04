<template>
  <el-form label-width="80px" :model="personData">
    <el-form-item label="学号">
      <el-input v-model="personData.sno" disabled></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="personData.name"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="personData.password"></el-input>
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model="personData.age"></el-input>
    </el-form-item>
    <el-form-item label="选座信息">
      <el-input v-model="personData.position" disabled></el-input>
    </el-form-item>
    <el-form-item label="省份">
      <el-input v-model="personData.province"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import * as userServ from "@/api/user";
import { filterObj } from "@/util/index.js";
export default {
  data() {
    return {
      personData: null,
      id: "",
    };
  },
  created() {
    this.personData = filterObj(this.$store.state.user.user, ["id"]);
    this.id = this.$store.state.user.user.id;
  },
  methods: {
    async submitForm() {
      const res = await userServ.updateUserIfo({
        id: this.id,
        sno: this.personData.sno,
        name: this.personData.name,
        password: this.personData.password,
        age: this.personData.age,
        position: this.personData.position,
        count: this.personData.count,
        province: this.personData.province,
      });
      if (res.success) {
        localStorage.setItem(
          "user",
          JSON.stringify({ id: this.id, ...this.personData })
        );
        this.$message({
          message: "修改成功",
          type: "success",
        });
      } else {
        this.$message({
          message: "修改失败",
          type: "error",
        });
      }
    },
  },
};
</script>

<template>
  <div class="register-container">
    <div class="main">
      <div class="content">
        <div class="box">
          <input class="inp" type="text" placeholder="学号：" v-model="sno" />
          <span class="err">{{ err.snoErr }}</span>
        </div>
        <div class="box">
          <input
            class="inp"
            type="password"
            placeholder="密码："
            v-model="password"
          />
          <span class="err">{{ err.pwdErr }}</span>
        </div>
        <div class="box">
          <input class="inp" type="text" placeholder="姓名：" v-model="name" />
          <span class="err">{{ err.nameErr }}</span>
        </div>
        <div class="box">
          <input
            class="inp"
            type="text"
            placeholder="年龄："
            v-model="age"
          />
          <span class="err">{{ err.ageErr }}</span>
        </div>
        <div class="box">
          <input
            class="inp"
            type="text"
            placeholder="省份："
            v-model="province"
          />
          <span class="err">{{ err.provinceErr }}</span>
        </div>
        <el-button type="primary" @click="register">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as userServ from "../../api/user";
export default {
  data() {
    return {
      sno: "",
      password: "",
      name: "",
      age: "",
      province: "",
      err: {
        snoErr: "",
        pwdErr: "",
        nameErr: "",
        ageErr: "",
        provinceErr: "",
      },
    };
  },
  methods: {
    async register() {
      this.err.snoErr = this.sno ? "" : "学号不能为空";
      this.err.pwdErr = this.password ? "" : "密码不能为空";
      this.err.nameErr = this.name ? "" : "姓名不能为空";
      this.err.ageErr = this.age ? "" : "年龄不能为空";
      this.err.provinceErr = this.province ? "" : "省份不能为空";
      if (
        !this.sno ||
        !this.password ||
        !this.name ||
        !this.age ||
        !this.province
      ) {
        return;
      }
      const resp = await userServ.register(
        this.sno,
        this.password,
        this.name,
        this.age,
        0,
        this.province
      );
      if (resp.success) {
        this.$message({
          message: "注册成功，请登录，即将跳转到登录界面",
          type: "success",
        });
        this.$router.push({
          name: "login",
        });
      } else {
        this.$message({
          message: resp.msg,
          type: "error",
        });
      }
    },
  },
};
</script>
<style scoped>
.refgister-container {
  width: 100%;
  height: 100%;
}
.content {
  width: 200px;
  display: flex;
  flex-direction: column;
  margin-top: 45px;
}
h2 {
  color: gray;
  margin-top: 50px;
  text-align: center;
}
.content .inp {
  width: 100%;
  box-sizing: border-box;
  display: block;
  height: 20px;
  padding: 20px 10px;
  border: 1px solid;
  border-radius: 4px;
  margin-bottom: 30px;
  outline: none;
  border: 0;
}
.content .entry {
  display: flex;
  justify-content: space-around;
}
.content .submit {
  display: block;
  width: 80px;
  height: 40px;
  margin-top: 20px;
  background-color: rgb(82, 82, 241);
  border-radius: 10px;
  outline: none;
  color: white;
  font-size: 20px;
}
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  text-align: center;
}
.form {
  margin: 50px 30px;
}
.box {
  position: relative;
}
.err {
  position: absolute;
  top: 44px;
  left: 9px;
  color: red;
  font-size: 14px;
}
</style>
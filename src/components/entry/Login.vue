<template>
  <div class="login-container">
    <div class="login-container">
      <div class="main">
        <div class="picture">
          <div class="img">
            <img src="@/assets/img/library1.png" alt="" />
          </div>
          <div class="img">
            <img src="@/assets/img/computer.png" alt="" />
          </div>
          <div class="img">
            <img src="@/assets/img/library2.png" alt="" />
          </div>
          <div class="img">
            <img src="@/assets/img/seat.png" alt="" />
          </div>
        </div>
        <div class="form">
          <form action="">
            <div class="content">
              <div class="sno">
                <input
                  class="inp"
                  type="text"
                  placeholder="学号："
                  v-model="sno"
                />
                <span class="err">{{err.snoErr}}</span>
              </div>
              <div class="pwd">
                <input
                  class="inp"
                  type="password"
                  placeholder="密码"
                  v-model="password"
                />
                <span class="err">{{err.pwdErr}}</span>
              </div>
              <div class="entry">
                <el-button type="primary" style="width: 200px" @click="login"
                  >登录</el-button
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      sno: "",
      password: "",
      err: {
        snoErr: "",
        pwdErr: "",
      },
    };
  },
  computed: mapState("user", ["user"]),
  methods: {
    async login() {
      this.err.snoErr = this.sno ? "" : "学号不能为空";
      this.err.pwdErr = this.password ? "" : "密码不能为空";
      if (!this.sno || !this.password) {
        return;
      }
      const resp = await this.$store.dispatch("user/login", {
        sno: this.sno,
        password: this.password,
      });
      if (resp) {
        this.$router.push({ name: "home" });
        this.$message({
          message: "登录成功",
          type: "success",
        });
        if(this.user.sno === 'admin') {
          this.$router.push({
            name: 'showChart'
          });
        } else {
          this.$router.push({
            name: 'index'
          })
        }
      } else {
        this.$message({
          message: "账号密码错误,请重新登录",
          type: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
.content {
  width: 200px;
  display: flex;
  flex-direction: column;
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
  padding: 20px;
  border: 1px solid;
  border-radius: 4px;
  margin-bottom: 38px;
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
.picture img {
  padding: 0px 10px;
  width: 90px;
  height: 90px;
}
.picture {
  display: flex;
  flex-direction: row;
  width: 220px;
  height: 220px;
  flex-wrap: wrap;
  margin-right: 50px;
}
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  text-align: center;
}
.sno, .pwd {
  position: relative;
}
span.err {
  position: absolute;
  top: 43px;
  left: 8px;
  color: red;
  font-size: 14px;
}
</style>
<template>
  <div id="add-message">
    <form class="basic-grey">
      <h1>
        留言板
        <span class="num">留言条数：{{ length }}</span>
      </h1>
      <label for="name">
        <span>你的昵称：</span>
        <input
          id="name"
          type="text"
          placeholder="请输入昵称"
          v-model="username"
        />
        <span class="err">{{ err.username }}</span>
      </label>
      <label for="message">
        <span>你的留言内容：</span>
        <textarea
          id="message"
          name="message"
          cols="30"
          rows="10"
          placeholder="请输入留言内容"
          v-model="msg"
        ></textarea>
        <span class="err">{{ err.content }}</span>
      </label>
      <label for="">
        <input type="button" class="button" value="Send" @click="handleClick" />
      </label>
    </form>
  </div>
</template>

<script>
import * as msgServ from "@/api/msg";
export default {
  props: ["length"],
  data() {
    return {
      username: "",
      msg: "",
      err: {
        username: "",
        content: "",
      },
    };
  },
  methods: {
    async handleClick() {
      this.err.username = this.username ? "" : "请输入昵称";
      this.err.content = this.msg ? "" : "请输入内容";
      if (!this.username || !this.msg) {
        return;
      }
      const time = Date.now();
      const resp = await msgServ.addMsg(this.username, this.msg, time);
      if (resp.success) {
        this.$message({
          message: "感谢您的留言♥",
          type: "success",
        });
      }
      this.$emit("addMsg", {
        username: this.username,
        msg: this.msg,
        send_time: time,
      });
      this.username = "";
      this.msg = "";
    },
  },
};
</script>

<style scoped>
#add-message {
  height: 100%;
  min-width: 500px;
  max-width: 500px;
}
.basic-grey {
  box-sizing: border-box;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  background: #ddd;
  padding: 25px 15px 25px 10px;
  font: 12px Georgia, "Times New Roman", Times, serif;
  color: #888;
  text-shadow: 1px 1px 1px #fff;
  border: 1px solid #e4e4e4;
}
.basic-grey h1 {
  font-size: 30px;
  padding: 0px 0px 10px 40px;
  display: block;
  border-bottom: 1px solid #e4e4e4;
  margin: -10px -15px 30px -10px;
  color: #666;
}

.basic-grey h1 > span {
  font-size: 12px;
}
.basic-grey label {
  display: block;
  margin: 0px;
  position: relative;
}
span.err {
  position: absolute;
  bottom: 0;
  left: 90px;
  color: red !important;
}
.basic-grey label:nth-of-type(1) input:hover,
.basic-grey label textarea:hover {
  box-shadow: -1px 1px 5px #000;
  transform: scale(1.005) translate(3px, -3px);
  color: inherit;
}
.basic-grey label > span {
  float: left;
  width: 20%;
  text-align: right;
  padding-right: 10px;
  margin-top: 10px;
  color: #888;
  font-size: 12px;
  font-weight: bolder;
}
.basic-grey input[type="text"],
.basic-grey input[type="email"],
.basic-grey textarea {
  border: 1px solid #dadada;
  color: #888;
  height: 30px;
  margin-bottom: 16px;
  margin-right: 6px;
  margin-top: 2px;
  outline: 0 none;
  padding: 3px 3px 3px 5px;
  width: 70%;
  font-size: 16px;
  line-height: 15px;
  box-shadow: inset 0px 1px 4px #ececec;
  -moz-box-shadow: inset 0px 1px 4px #ececec;
  -webkit-box-shadow: inset 0px 1px 4px #ececec;
}
.basic-grey textarea {
  padding: 5px 3px 3px 5px;
}

.basic-grey textarea {
  height: 100px;
  max-width: 70%;
  max-height: 200px;
}

.basic-grey .button {
  background: #4e6ef2;
  border: none;
  color: #fff;
  padding: 10px 25px 10px 25px;
  box-shadow: 1px 1px 5px #b6b6b6;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 50%;
  transform: translate(-50%, 0);
}

.basic-grey .button:hover {
  background: #fff;
  color: #000;
}
::-webkit-input-placeholder {
  color: #ccc;
  font-size: 12px;
}
</style>
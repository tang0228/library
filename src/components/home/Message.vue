<template>
  <div id="message-container">
    <MsgForm @addMsg="click" :length="list.length" />
    <MsgList :list="list" />
  </div>
</template>
<script>
import * as msgServ from "@/api/msg";
import MsgForm from "../MsgForm.vue";
import MsgList from "../MsgList.vue";
export default {
  data() {
    return {
      list: "",
    };
  },
  components: {
    MsgForm,
    MsgList,
  },
  async created() {
    const resp = await msgServ.getAllMsg();
    this.list = resp.detail;
  },
  methods: {
    click(value) {
      this.list.unshift({
        ...value,
      });
    },
  },
};
</script>

<style scoped>
#message-container {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 90%;
  display: flex;
  overflow: hidden;
}
#message-container #add-message {
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

#message-container #message-list {
  height: 100%;
  width: 100%;
  background-color: #fff;
  padding: 30px;
  transition: 1s;
}
#message-container #message-list:hover {
  background-color: #ddd;
  transition: 1s;
}
#message-container #message-list .message-list-body {
  border-radius: 20px;
  height: 90%;
  width: 100%;
  background-color: #fff;
  overflow-y: auto;
  background-size: cover;
  transition: 1s;
  border: 1px solid white;
}
#message-container #message-list .message-list-body:hover {
  transform: scale(1.01) translate(3px, -3px);
  transition: 1s;
}
#message-container #message-list .message-list-body::-webkit-scrollbar {
  display: none;
}
#mes .message-name {
  /* font-size: 20px; */
  text-shadow: 0.3px 0 0 rgba(255, 255, 255, 0.5),
    -1px 0 0 rgba(255, 255, 255, 0.5), 0 1px 0 rgba(255, 255, 255, 0.5),
    0 -1px 0 rgba(255, 255, 255, 0.5);
  color: rgb(57, 121, 64);
  margin: 10px 40px 10px;
  /* text-shadow:2px 2px 4px red; */
}
#mes .message-date {
  display: block;

  text-align: end;
  font-size: 12px;
}
#mes .message-body {
  font-size: 18px;
  color: black;
  margin-left: 80px;
  margin-bottom: 15px;
  font-family: "楷体";
}
</style>
<template>
  <div id="message-list">
    <div class="message-list-body">
      <div id="mes">
        <div v-for="(item, i) in list" :key="i">
          <h2 class="message-name">
            {{ item.username }}：<span class="message-date"
              >更新于：{{ format(item.send_time) }}</span
            >
          </h2>
          <div class="message-body">{{ item.msg }}</div>
          <div style="border-bottom: 1px dashed #4e6ef2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "@/util";
export default {
  props: ["list"],
  data() {
    return {
      format,
    };
  },
};
</script>

<style scoped>
#message-list {
  height: 100%;
  width: 100%;
  background-color: #fff;
  padding: 30px;
  transition: 1s;
}
#message-list:hover {
  background-color: #ddd;
  transition: 1s;
}
#message-list .message-list-body {
  border-radius: 20px;
  height: 90%;
  width: 100%;
  background-color: #fff;
  overflow-y: auto;
  background-image: url(https://images.pexels.com/photos/1260727/pexels-photo-1260727.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260);
  background-size: cover;
  transition: 1s;
  border: 1px solid white;
}
#message-list .message-list-body:hover {
  transform: scale(1.01) translate(3px, -3px);
  transition: 1s;
}
#message-list .message-list-body::-webkit-scrollbar {
  display: none;
}
#mes .message-name {
  color: #4e6ef2;
  margin: 10px 40px 10px;
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
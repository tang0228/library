<template>
  <div class="home-container">
    <div class="main">
      <RouterLink
        :to="{
          name: 'person',
        }"
      >
        <div class="user">
          <img class="img" src="../../assets/img/yonghu.png" alt="" />
          <span class="span">姓名：{{ user.name }}</span>
          <span class="span">学号：{{ user.sno }}</span>
        </div>
      </RouterLink>
      <RouterLink
        :to="{
          name: 'choose',
        }"
      >
        <div class="seat">
          <img src="../../assets/img/zuowei.png" alt="" />
          <span class="span">选座</span>
        </div>
      </RouterLink>
      <RouterLink
        :to="{
          name: 'index',
        }"
      >
        <div class="record">
          <img src="../../assets/img/jilu.png" alt="" />
          <span class="span">已选座位：{{ user.position || "无" }}</span>
        </div>
      </RouterLink>
      <RouterLink
        :to="{
          name: 'message',
        }"
      >
        <div class="message">
          <img src="../../assets/img/liuyan.png" alt="" />
          <span class="span">留言</span>
        </div>
      </RouterLink>
    </div>
    <div class="page-line-chart">
      <h4>学生信息折线图</h4>
      <ve-line :data="chartData"></ve-line>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as userServ from "@/api/user"
export default {
  data() {
    return {
      chartData: {
        columns: ["学号", "访问次数", "年龄"],
        rows: []
      }
    }
  },
  props: ["userData"],
  computed: mapState("user", ["user"]),
  async created() {
    const res = await userServ.getAllUser();
    this.chartData.rows = res.detail.map(it => {
      return {
        学号: it.sno,
        访问次数: it.count,
        年龄: it.age
      }
    });
  },
};
</script>
<style scoped>
h4 {
  text-align: center;
}
.home-container {
  overflow: hidden;
  width: 100%;
}
.main {
  text-align: center;
  display: flex;
  justify-content: space-around;
}
.main .user,
.seat,
.record,
.message {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  height: 182px;
  width: 142px;
  padding: 0 5px;
  transition: 0.3s;
}
.user {
  background-color: lightblue;
}
.seat {
  background-color: lightcoral;
}
.record {
  background-color: lightgreen;
}
.message {
  background-color: #4e6edd;
}
.main .user:hover,
.seat:hover,
.record:hover,
.message:hover {
  transform: scale(1.1);
  color: inherit;
}
.main a {
  text-decoration: none;
  color: white;
  display: block;
}
.main img {
  width: 100px;
  height: 100px;
  margin: 20px;
}
</style>
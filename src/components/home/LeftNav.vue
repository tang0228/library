<template>
  <div class="left-nav">
    <ul class="nav">
      <template v-if="user.name !== 'admin'">
        <el-menu
          class="el-menu-vertical-demo"
          router
          background-color="#fff"
          text-color="#000"
          active-text-color="#4e6ef2"
        >
          <el-menu-item index="index">
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="choose">
            <span slot="title">在线选座</span>
          </el-menu-item>
          <el-menu-item index="person">
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="message">
            <span slot="title">留言板</span>
          </el-menu-item>
          <el-menu-item index="lostFound">
            <span slot="title">失物招领 </span>
          </el-menu-item>
          <el-menu-item index="addGood">
            <span slot="title">发布失物招领</span>
          </el-menu-item>
        </el-menu>
      </template>
      <template v-if="user.name === 'admin'">
        <el-menu
          class="el-menu-vertical-demo"
          router
          background-color="#fff"
          text-color="#000"
          active-text-color="#4e6ef2"
        >
          <el-menu-item index="showChart">
            <span slot="title">图表</span>
          </el-menu-item>
          <el-menu-item index="userList">
            <span slot="title">学生列表</span>
          </el-menu-item>
          <el-menu-item index="seatList">
            <span slot="title">座位列表</span>
          </el-menu-item>
          <el-menu-item index="msgList">
            <span slot="title">留言列表</span>
          </el-menu-item>
          <el-menu-item index="goodsList" class="goodsList">
            <span slot="title">失物招领信息</span>
            <span class="new" v-show="value > 0">{{
              value > 0 ? value : ""
            }}</span>
          </el-menu-item>
        </el-menu>
      </template>
    </ul>
  </div>
</template>

<script>
import * as goodsServ from "@/api/goods";
import { mapState } from "vuex";
export default {
  data() {
    return {
      value: 0,
    };
  },
  computed: mapState("user", ["user"]),
  async created() {
    const resp = await goodsServ.getAllGoods();
    resp.detail.forEach((it) => {
      if (it.agree === "0") {
        this.value++;
      }
    });
    this.$bus.$on("agree", this.handle);
  },
  methods: {
    handle(value) {
      this.value = value;
    },
  },
};
</script>

<style scoped>
.left-nav {
  width: 100%;
  height: 100%;
  /* background: url(../../assets/home.png); */
  opacity: 0.5;
}
.nav {
  width: 100%;
}
.item {
  line-height: 20px;
}
.item a {
  display: inline-block;
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;
}
.item a.router-link-exact-active {
  width: 100%;
  display: inline-block;
  color: #4e6ef2;
  box-sizing: border-box;
}
.el-menu-vertical-demo {
  height: 100%;
}
.goodsList {
  position: relative;
}
.new {
  position: absolute;
  display: inline-block;
  background-color: red;
  width: 20px;
  height: 20px;
  color: #fff;
  top: 19px;
  right: 71px;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
}
</style>
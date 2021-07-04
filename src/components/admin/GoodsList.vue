<template>
  <div class="msg-list">
    <table cellpadding="0" cellspacing="0">
      <thead>
        <th>ID</th>
        <th>姓名</th>
        <th>学号</th>
        <th>物品</th>
        <th>描述</th>
        <th>图片</th>
        <th>是否发布</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="(item, i) in goodsList">
          <td>{{ item.id }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.sno }}</td>
          <td>{{ item.goods }}</td>
          <td :title="item.des">{{ item.des }}</td>
          <td>
            <img :src="item.imgSrc" width="20px" alt="" />
          </td>
          <td class="disagree" :class="{ agree: item.agree === '1' }">
            {{ item.agree === "1" ? "已发布" : "未发布" }}
          </td>
          <td class="operation">
            <el-button
              @click="agree(item)"
              v-show="item.agree !== '1'"
              type="primary"
            >
              同意
            </el-button>
            <el-button type="danger" @click="del(item)">删除</el-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as goodsServ from "@/api/goods";
export default {
  data() {
    return {
      goodsList: "",
      value: 0,
    };
  },
  async created() {
    const resp = await goodsServ.getAllGoods();
    this.goodsList = resp.detail;
    resp.detail.forEach((it) => {
      if (it.agree === "0") {
        this.value++;
      }
    });
  },
  methods: {
    async agree(item) {
      const resp = await goodsServ.updateGoods({
        ...item,
        agree: "1",
      });
      if (resp.success) {
        this.$message({
          message: "已同意发布",
          type: "success",
        });
        this.value--;
        goodsServ.getAllGoods().then((resp) => {
          this.goodsList = resp.detail;
        });
        this.$bus.$emit("agree", this.value);
      }
    },
    async del(item) {
      const resp = await goodsServ.delGoods(item.id);
      if (item.agree === "0") {
        this.value--;
        this.$bus.$emit("agree", this.value);
      }
      if (resp.success) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        goodsServ.getAllGoods().then((resp) => {
          this.goodsList = resp.detail;
        });
      }
    },
  },
};
</script>

<style scoped>
@import "~@/assets/css/table.css";

td.disagree {
  color: red;
}
td.agree {
  color: #4e6ef2;
}
</style>
<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in goodsList" :key="item.id">
      <div class="box">
        <img :src="item.imgSrc" :alt="item.goods" :title="item.des"/>
        <div class="content">
          <h1>{{ item.goods }}</h1>
          <h4>学号：{{ item.sno }}，姓名：{{ item.username }}</h4>
          <p class="des">{{ item.des }}</p>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import * as goodsServ from "@/api/goods";
export default {
  data() {
    return {
      goodsList: "",
    };
  },
  async created() {
    const resp = await goodsServ.getAllGoods();
    this.goodsList = resp.detail.filter(it => it.agree === '1');
  },
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.box {
  display: flex;
}
.box img {
  width: 200px;
  margin-right: 20px;
  height: 200px;
  width: 200px;
  object-fit: cover;
}
h1,
h4 {
  margin: 0 0 10px 0;
  font-weight: normal;
}
.content {
  flex: 1 1 auto;
}
</style>
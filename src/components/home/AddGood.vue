<template>
  <el-form label-width="80px" :model="goodsData">
    <el-form-item label="学号">
      <el-input v-model="goodsData.sno"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="goodsData.username"></el-input>
    </el-form-item>
    <el-form-item label="丢失物品">
      <el-input v-model="goodsData.goods"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="goodsData.des"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getRandom } from "@/util";
import * as goodsServ from "@/api/goods";
export default {
  data() {
    return {
      imgSrcs: [
        "https://img1.baidu.com/it/u=3131637597,3686055263&fm=26&fmt=auto&gp=0.jpg",
        "https://img0.baidu.com/it/u=3651142225,2624754036&fm=26&fmt=auto&gp=0.jpg",
        "https://img2.baidu.com/it/u=1250028348,3302663061&fm=26&fmt=auto&gp=0.jpg",
        "https://img2.baidu.com/it/u=3118830391,232716301&fm=26&fmt=auto&gp=0.jpg",
      ],
      goodsData: {
        sno: "",
        username: "",
        goods: "",
        des: "",
      },
    };
  },
  methods: {
    async submitForm() {
      if(!this.goodsData.sno || !this.goodsData.username || !this.goodsData.goods || !this.goodsData.des) {
        this.$message({
          message: "信息不完全",
          type: "warning"
        });
        return;
      }
      const resp = await goodsServ.addGoods({
        ...this.goodsData,
        imgSrc: this.imgSrcs[getRandom(0, this.imgSrcs.length)],
        agree: '0'
      });
      if (resp.success) {
        this.$message({
          message: "发布成功",
          type: "success",
        });
      }
      this.goodsData = {
        sno: "",
        username: "",
        goods: "",
        des: "",
      };
    },
    resetForm() {
      this.goodsData = {
        sno: "",
        username: "",
        goods: "",
        des: "",
      };
    },
  },
};
</script>

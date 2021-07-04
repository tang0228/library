<template>
  <div>
    <div class="header">图书阅览室</div>
    <div id="content">
      <div id="content-left">
        <Item :length="length" @callType="callType" />
      </div>
      <div class="content-right">
        <el-radio-group v-model="labelPosition" size="small"> </el-radio-group>
        <el-form
          label-width="100px"
          :model="formLabelAlign"
        >
          <el-form-item label="选择的座位" style="position: relative;margin-top: 20px">
            <el-input v-model="formLabelAlign.type"></el-input>
            <el-button type="primary" class="btn" @click="handle">选座</el-button>
          </el-form-item>
        </el-form>
        <div class="styleSelect">
          <div style="width: 50px; height: 30px; text-align: center;">
            <img class="select" src="../../assets/img/select.png" alt="" />可选
          </div>
          <div style="width: 50px; height: 30px; text-align: center;">
            <img
              class="select"
              src="../../assets/img/selected.png"
              alt=""
            />已选
          </div>
          
        </div>
      </div>
      <div class="footer">
        温馨小提示:当天只能预约当天的位置哦，请不要乱选，以免影响到其他人的学习
      </div>
      <div class="Charts">
        <div id="dataShow" :style="{ width: '400px', height: '500px' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as seatServ from "@/api/seat";
import * as userServ from "@/api/user";
import Item from "./Item.vue";
export default {
  props: ["roomId", "floor"],
  components: {
    Item,
  },
  computed: mapState("user", ["user"]),
  async created() {
    await seatServ.getAllSeat().then((r) => {
      this.length = r.detail.filter(
        (r) => r.roomId == this.roomId && r.floor == this.floor
      );
      this.charts.total = this.length.length;
      this.charts.isSelected = this.length.filter((r) => r.userSno).length;
      this.charts.other = this.charts.total - this.charts.isSelected;
    });
    const myChart = this.$echarts.init(document.getElementById("dataShow"));
    const option = {
      title: {
        text: "座位状态分布图",
        subtext: `座位总数：${this.charts.total}`,
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "info",
          type: "pie",
          radius: "50%",
          data: [
            { value: this.charts.isSelected, name: "已选" },
            { value: this.charts.other, name: "未选" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    myChart.setOption(option);
  },
  methods: {
    handle() {
      if (this.user.position) {
        this.$message({
          type: "warning",
          message: "已选座位，不能再选",
        });
        return;
      }
      this.$confirm(
        `确认选择${this.floor}楼${this.roomId}室${this.select.deskId}号座位？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        }
      )
        .then(async () => {
          this.choose(this.select);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消选座",
          });
        });
    },
    async choose(item) {
      this.$store.commit("user/setUser", {
        ...this.user,
        position: [item.floor, item.roomId, item.deskId].join("-"),
      });
      localStorage.setItem("user", JSON.stringify(this.user));
      const res = await userServ.updateUserIfo({
        ...this.user,
      });
      if (res.success) {
        this.$message({
          type: "success",
          message: "选座成功!",
        });
        this.$router.push("/index");
      }
      const editRes = await seatServ.updateSeat({
        id: item.id,
        floor: item.floor,
        roomId: item.roomId,
        deskId: item.deskId,
        userSno: this.user.sno,
      });
    },
    callType(e) {
      this.select.id = e.id;
      this.select.deskId = e.deskId;
      this.select.floor = this.floor;
      this.select.roomId = this.roomId;
      e == null
        ? (this.formLabelAlign.type = null)
        : (this.formLabelAlign.type = `已选第${e.deskId}座位`);
    },
  },
  destroyed() {},
  data() {
    return {
      length: [],
      select: {},
      charts: {},
      labelPosition: "right",
      formLabelAlign: {
        start: "",
        ent: "",
        type: "",
      },
    };
  },
};
</script>

<style>
.Charts {
  position: absolute;
  right: 0px;
  top: 100px;
}
.header {
  width: 90%;
  height: 20px;
  text-align: center;
  font-size: 20px;
}
#content {
  width: 65%;
  height: 400px;
  border: seashell solid 5px;
  margin: 10px auto;
  margin-left: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
#content #content-left {
  height: 80%;
  width: 50%;
  border-right: rgb(179, 176, 175) solid 1px;
  margin-bottom: 0px;
  display: flex;
  flex-wrap: wrap;
}
#content .content-right {
  height: 100%;
  width: 25%;
}

#content .content-right .item {
  width: 100%;
  height: 30px;
  margin-top: 12px;
}
#content .content-right .item .item-i {
  height: 20px;
  width: 150px;
}
#content .content-right .item .item-i1 {
  height: 20px;
  width: 150px;
  border: aliceblue solid 0px;
}
#content .content-right .btn {
  width: 60px;
  height: 40px;
}
.content-item {
  padding: 0px;
  width: 60px;
  height: 60px;
  background-image: url("../../assets/img/select.png");
  background-size: 60px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
}
.content-item:hover {
  background-image: url("../../assets/img/selected.png");
  transform: scale(1.1);
}
.content-item1 {
  padding: 0px;
  width: 60px;
  height: 60px;
  background-image: url("../../assets/img/selected.png");
  background-size: 60px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
}
#content .content-right .styleSelect {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
}
#content .content-right .styleSelect .select {
  width: 40px;
  height: 40px;
}
.footer {
  text-align: center;
  width: 80%;
  height: 30px;
  margin: auto;
  margin-top: 20px;
  font-size: 12px;
}
.btn {
  position: absolute;
  right: -85px;
  top: 0;
}
</style>
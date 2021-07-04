<template>
  <div class="page-line-chart">
    <h4>各省学生人数</h4>
    <ve-map :data="chartData"></ve-map>
  </div>
</template>

<script>
import * as userServ from "@/api/user";
import {newMap} from "@/util"
export default {
  data() {
    return {
      chartData: {
        columns: ["位置", "学生人数"],
        rows: [],
      },
    };
  },
  async created() {
    const resp = await userServ.getAllUser();
    const newData = newMap(resp.detail);
    this.chartData.rows = newData;
  },
};
</script>

<style scoped>
.page-line-chart {
  margin: 0 auto;
  width: 518px;
  height: 400px;
}
</style>
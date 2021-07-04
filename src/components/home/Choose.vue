<template>
  <div class="choose">
    <el-table :data="tableData" style="width: 50%">
      <el-table-column label="ID" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="楼层" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.floor }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房间号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.roomId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >进入选座</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      fullscreen
      v-if="show"
      title="在线选座"
      :visible="dialogVisible"
      width="90%"
    >
      <span>楼层：{{ select.floor }} 房间号：{{ select.roomId }}</span>
      <List :roomId="select.roomId" :floor="select.floor" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancel">退 出</el-button>
      </span>
    </el-dialog>
    <div class="Charts">
      <h4 style="margin: 0; text-align:center"> 座位信息表</h4>
      <div id="dataShow" :style="{ width: '600px', height: '500px' }"></div>
    </div>
  </div>
</template>
<script>
import List from "@/components/seat/List";
import * as roomServ from "@/api/room";
import * as seatServ from "@/api/seat";
import { mapState } from "vuex";
export default {
  data() {
    return {
      show: false,
      tableData: [],
      select: {},
      charts: [],
      dialogVisible: false,
    };
  },
  components: {
    List,
  },
  computed: mapState("user", ["user"]),
  async created() {
    const resp = await roomServ.getAllRoom();
    this.tableData = resp.detail;
    const r = await seatServ.getAllSeat();
    this.getData(r.detail);
    const myChart = this.$echarts.init(document.getElementById("dataShow"));
    var option;
    var app = {};
    var posList = [
      "left",
      "right",
      "top",
      "bottom",
      "inside",
      "insideTop",
      "insideLeft",
      "insideRight",
      "insideBottom",
      "insideTopLeft",
      "insideTopRight",
      "insideBottomLeft",
      "insideBottomRight",
    ];

    app.configParameters = {
      rotate: {
        min: -90,
        max: 90,
      },
      align: {
        options: {
          left: "left",
          center: "center",
          right: "right",
        },
      },
      verticalAlign: {
        options: {
          top: "top",
          middle: "middle",
          bottom: "bottom",
        },
      },
      position: {
        options: posList.reduce(function (map, pos) {
          map[pos] = pos;
          return map;
        }, {}),
      },
      distance: {
        min: 0,
        max: 300,
      },
    };

    app.config = {
      rotate: 90,
      align: "left",
      verticalAlign: "middle",
      position: "insideBottom",
      distance: 15,
      onChange: function () {
        var labelOption = {
          normal: {
            rotate: app.config.rotate,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            position: app.config.position,
            distance: app.config.distance,
          },
        };
        myChart.setOption({
          series: [
            {
              label: labelOption,
            },
            {
              label: labelOption,
            },
            {
              label: labelOption,
            },
            {
              label: labelOption,
            },
          ],
        });
      },
    };

    var labelOption = {
      show: true,
      position: app.config.position,
      distance: app.config.distance,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      rotate: app.config.rotate,
      formatter: "{c}  {name|{a}}",
      fontSize: 16,
      rich: {
        name: {},
      },
    };

    option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: ["一室", "二室", "三室"],
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      xAxis: [
        {
          type: "category",
          axisTick: { show: false },
          data: ["一楼", "二楼", "三楼"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "一室",
          type: "bar",
          barGap: 0,
          label: labelOption,
          emphasis: {
            focus: "series",
          },
          data: [this.charts[0], this.charts[3], this.charts[6]],
        },
        {
          name: "二室",
          type: "bar",
          label: labelOption,
          emphasis: {
            focus: "series",
          },
          data: [this.charts[1], this.charts[4], this.charts[7]],
        },
        {
          name: "三室",
          type: "bar",
          label: labelOption,
          emphasis: {
            focus: "series",
          },
          data: [this.charts[2], this.charts[5], this.charts[8]],
        },
      ],
    };

    myChart.setOption(option);
  },
  methods: {
    handleEdit(index, row) {
      this.select.floor = row.floor;
      this.select.roomId = row.roomId;
      this.dialogVisible = true;
      this.show = true;
    },
    cancel() {
      this.show = false;
      this.dialogVisible = false;
    },
    getData(result) {
      for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
          this.charts.push(
            result.filter(
              (r) => r.floor == i && r.roomId == j && !r["userSno"]
            ).length
          );
          console.log(this.charts);
        }
      }
    },
  },
};
</script>

<style scoped>
.Charts {
  position: absolute;
  top: 200px;
}
</style>
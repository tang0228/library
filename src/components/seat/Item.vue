<template>
  <div class="sItem">
    <div
      v-for="(item, index) in length"
      :key="index"
      @click="onClicks(item, index)"
      class="item"
    >
      <div v-if="!item.userSno">
        <div class="content-item">{{ item.deskId }}</div>
      </div>
      <div v-if="item.userSno">
        <div class="content-item1">{{ item.deskId }}</div>
      </div>
      <div>{{ item.userSno ? item.userSno : "" }}</div>
    </div>
  </div>
</template>


<script>

import { mapState } from "vuex";
import * as userServ from "@/api/user";
import * as seatServ from "@/api/seat";
export default {
  props: {
    length,
  },
  computed: mapState("user", ["user"]),
  data() {
    return {
      stuId: "",
      staticState: null,
    };
  },
  methods: {
    onClicks(ele, index) {
      if (!ele.userSno) {
        if (this.staticState != null) {
          this.length[this.staticState].userSno = null;
        }
        this.length[index].userSno = this.user.sno;
        this.staticState = index;
        this.$emit("callType", ele);
      } else {
        if (this.staticState == index) {
          this.length[this.staticState].userSno = null;
          this.$emit("callType", ele);
          return null;
        } else {
          this.open(ele);
        }
      }
      this.$emit("callType", ele);
    },
    async del(item) {
      this.$store.commit("user/setUser", {
        ...this.user,
        position: null,
      });
      localStorage.setItem("user", JSON.stringify(this.user));
      const res = await userServ.updateUserIfo({
        ...this.user,
      });
      if (res.success) {
        this.$message({
          type: "info",
          message: `退座成功`,
        });
        this.$router.push("./index");
      }
      const seatRes = await seatServ.updateSeat({
        ...item,
        userSno: null,
      });
    },
    open(e) {
      if (this.user.sno == e.userSno) {
        this.$confirm(`确认退座吗？`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        })
          .then(async () => {
            this.del(e);
          })
          .catch(() => {});
      } else {
        this.$alert("该座位已经被选定", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `重新选择座位`,
            });
          },
        });
      }
    },
  },
};
</script>

<style>
.sItem {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: stretch;
}
.item {
  height: 80px;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
import ins from "./request";

// 获取所有费用清单
export async function getAllSeat() {
    const resp = await ins().get(`/seat/getAllSeat`);
    return resp.data;
};

// 修改座位信息
export async function updateSeat(seatObj) {
    const resp = await ins().get(`/seat/updateSeat`, {
        params: {
            ...seatObj
        }
    });
    return resp.data;
};

// 删除座位
export async function delSeat(id) {
    const resp = await ins().delete(`/seat/delSeat/${id}`);
    return resp.data;
}

// 添加座位信息
export async function addSeat(seatObj) {
    const resp = await ins().get("/seat/addSeat", {
        params: {
            ...seatObj
        }
    });
    return resp.data;
}
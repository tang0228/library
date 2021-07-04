import ins from "./request";

// 新增留言
export async function addMsg(username, msg, send_time) {
    const resp = await ins().get("/msg/addMsg", {
        params: {
            username,
            msg,
            send_time,
        }
    });
    return resp.data;
};

// 获取所有留言
export async function getAllMsg() {
    const resp = await ins().get("/msg/getAllMsg");
    return resp.data;
};

// 删除一条留言
export async function deleteMsg(id) {
    const resp = await ins().get(`/msg/delMsg/${id}`);
    return resp.data;
}
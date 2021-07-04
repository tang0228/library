import ins from "./request"

// 获取所有房间信息
export async function getAllRoom() {
    const resp = await ins().get("/room/getAllRoom");
    return resp.data;
}
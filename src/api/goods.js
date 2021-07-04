import ins from "./request"

// 新增失物招领信息
export async function addGoods(goodsObj) {
    const resp = await ins().get("/goods/addGoods", {
        params: {
            ...goodsObj
        }
    });
    return resp.data;
};

// 获取使用失物招领信息
export async function getAllGoods() {
    const resp = await ins().get("/goods/getAllGoods");
    return resp.data;
};

// 删除一条失物招领信息
export async function delGoods(id) {
    const resp = await ins().delete(`/goods/delGoods/${id}`);
    return resp.data;
}

// 修改失物招领信息
export async function updateGoods(goodsObj) {
    const resp = await ins().get("/goods/updateGoods", {
        params: {
            ...goodsObj
        }
    });
    return resp.data;
}

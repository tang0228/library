import ins from "./request";

// 登录
export async function login(sno, password) {
    const resp = await ins().get("/stu/login", {
        params: {
            sno,
            password
        }
    });
    return resp.data;
};

// 注销
export async function loginOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("ID");
};

// 我是谁
export function whoAmI() {
    const resp = JSON.parse(localStorage.getItem("user"));
    return resp;
};

// 注册
export async function register(sno, password, name, age, count, province) {
    const resp = await ins().get("/stu/register", {
        params: {
            sno,
            password,
            name,
            age,
            count,
            province
        }
    });
    return resp.data;
};

// 修改个人信息
export async function updateUserIfo(stuObj) {
    const resp = await ins().get(`/stu/update`, {
        params: {
            ...stuObj
        }
    });
    return resp.data;
};

// 获取所有用户
export async function getAllUser() {
    const resp = await ins().get('/stu/getAllStu');
    return resp.data;
}

// 删除学生
export async function delStu(id) {
    const resp = await ins().delete(`/stu/delStu/${id}`);
    return resp.data;
}








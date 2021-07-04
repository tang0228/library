import * as userServ from "../api/user";

export default {
    namespaced: true,
    state: {
        user: JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : null,
        role: localStorage.getItem("role") ? localStorage.getItem("role") : 'user',
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        async login({ commit }, { sno, password }) {
            let result = await userServ.login(sno, password);
            if (result.detail) {
                // 每登录一次，登录次数+1
                let res = {
                    ...result.detail,
                    count: result.detail.count + 1
                };
                const newRes = await userServ.updateUserIfo({
                    ...res
                })
                if (newRes.success) {
                    localStorage.setItem("role", result.detail.role);
                    localStorage.setItem("ID", result.detail.sno);
                    localStorage.setItem("user", JSON.stringify(res));
                    commit("setUser", res);
                    return res;
                }
            }
            return null;
        },
        async whoAmI({ commit }) {
            try {
                const result = await userServ.whoAmI();
                commit("setUser", result);
            } catch {
                commit("setUser", null);
            }
        },
    }
}
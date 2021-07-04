import Login from "../components/entry/Login.vue"
import Register from "../components/entry/Register.vue"
import Entry from "../views/Entry/Entry.vue"
import Home from "../views/Home/Home.vue"
import Person from "../components/home/Person.vue"
import Choose from "../components/home/Choose.vue"
import Message from "../components/home/Message.vue"
import UserList from "../components/admin/UserList.vue"
import SeatList from "../components/admin/SeatList.vue"
import MsgList from "../components/admin/MsgList.vue"
import Show from "../components/home/Show.vue"
import LostFound from "../components/home/LostFound.vue"
import AddGood from "../components/home/AddGood.vue"
import ShowChart from "../components/admin/ShowChart.vue"
import GoodsList from "../components/admin/GoodsList.vue"

let routes = [
    {
        path: '/entry',
        name: 'entry',
        component: Entry,
        redirect: '/entry/login',
        children: [{
            path: 'login',
            name: 'login',
            component: Login
        }, {
            path: 'register',
            name: 'register',
            component: Register
        }]
    }, {
        path: '/',
        name: 'home',
        component: Home,
        children: [{
            path: 'index',
            name: 'index',
            component: Show,
            meta: {
                title: '首页'
            }
        },{
            path: 'person',
            name: 'person',
            component: Person,
            meta: {
                title: '个人信息'
            }
        }, {
            path: 'choose',
            name: 'choose',
            component: Choose,
            meta: {
                title: '在线选座'
            }
        }, {
            path: 'message',
            name: 'message',
            component: Message,
            meta: {
                title: '留言板'
            }
        }, {
            path: 'addGood',
            name: 'addGood',
            component: AddGood,
            meta: {
                title: '发布失物招领'
            }
        },{
            path: 'userList',
            name: 'userList',
            component: UserList,
            meta: {
                title: '学生列表'
            }
        }, {
            path: 'seatList',
            name: 'seatList',
            component: SeatList,
            meta: {
                title: '座位列表'
            }
        }, {
            path: 'msgList',
            name: 'msgList',
            component: MsgList,
            meta: {
                title: '留言列表'
            }
        }, {
            path: 'lostFound',
            name: 'lostFound',
            component: LostFound,
            meta: {
                title: '失物招领'
            }
        }, {
            path: 'showChart',
            name: 'showChart',
            component: ShowChart,
            meta: {
                title: '图表'
            }
        }, {
            path: 'goodsList',
            name: 'goodsList',
            component: GoodsList,
            meta: {
                title: '失物招领信息'
            }
        }]
    }
];

// let allRoutes = [{
//     path: 'person',
//     name: 'person',
//     component: Person,
//     meta: {
//         title: '个人信息'
//     }
// }, {
//     path: 'personFee',
//     name: 'personFee',
//     component: PersonFee,
//     meta: {
//         title: '个人物业费'
//     }
// }, {
//     path: 'message',
//     name: 'message',
//     component: Message,
//     meta: {
//         title: '留言板'
//     }
// }, {
//     path: 'userList',
//     name: 'userList',
//     component: UserList,
//     meta: {
//         title: '业主列表'
//     }
// }, {
//     path: 'feeList',
//     name: 'feeList',
//     component: FeeList,
//     meta: {
//         title: '费用清单列表'
//     }
// }, {
//     path: 'msgList',
//     name: 'msgList',
//     component: MsgList,
//     meta: {
//         title: '留言列表'
//     }
// }];

// const newarr = allRoutes.filter(item => {
//     return allowRoutes.includes(item.name);
// })

// for (let i = 0; i < newarr.length; i++) {
//     baseRoutes[1].children.push(newarr[i]);
// }

export default routes;
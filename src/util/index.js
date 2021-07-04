// 对象的过滤
export function filterObj(obj, arr) {
    if (typeof obj !== 'object' || !Array.isArray(arr)) {
        return;
    }
    const result = {};
    Object.keys(obj).filter(key => !arr.includes(key)).forEach(key => {
        result[key] = obj[key];
    });
    return result;
};

// 判断1-1-1 === 1， 1， 1转换后的结构1-1-1
export function transform(str, str1, str2, str3) {
    if (!str) {
        return false;
    }
    const newArr = [str1.toString(), str2.toString(), str3.toString()];
    const arr = str.split("-");
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== newArr[i]) {
            return false;
        }
    }
    return true;
};

// 获取随机数 0 - 4
export function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

// 转换数据格式
export function newMap(arr) {
    let obj = {};
    arr.forEach(item => {
        if (!obj[item.province]) {
            obj[item.province] = 1;
        } else {
            obj[item.province]++;
        }
    });
    let newArr = [];
    for (const key in obj) {
        newArr.push({
            位置: key,
            学生人数: obj[key],
        })
    }
    return newArr;
};


// 时间戳转化
function add0(m) { return m < 10 ? '0' + m : m }
export function format(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    const time = new Date(+shijianchuo);
    const y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    const h = time.getHours();
    const mm = time.getMinutes();
    const s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}




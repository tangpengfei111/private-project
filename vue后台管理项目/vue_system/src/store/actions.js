import axios from './axiosSet'
axios.defaults.baseURL = 'http://localhost:3000';



// 用户登录
export function load({commit},option) {
    return axios.post('/admin/load',option)
}
// 退出登录
export function exitLogin({commit},option) {
    return axios.post('/admin/exit',option)
}
// 注册帐号
export function register({commit},option) {
    console.log(option)
    return axios.post('/admin/register',option)
}
// 获取所有设备信息
export function getCellList({commit},option) {
    axios.get('/cellphone/allList').then((data) => {
        commit('getCellListData',data.data)
    })
}
// 添加设备数据
export function addCellphone({commit},option) {
    return axios.post('/cellphone/addItemData',option)
}
// 删除设备数据
export function delCellphone({commit},option) {
    axios.get('/cellphone/delItemData',{
        params: {
            id:option.id
        }
    }).then((data) => {
        if (data.data === 'success') {
            commit('delCellListData',option)
        }
    })
}
// 获取所有设备分组信息
export function getCellphoneList({commit}) {
    axios.get('/cellphone/groupMessage').then((data) => {
        commit('getCellphoneGroupData',data.data)
    })
}
// 添加设备分组
export function addCellphoneGroupData({commit},option) {
    axios.post('/cellphone/addGroup',option).then((data) => {
        if (data.data == 'success') {
            commit('addGroupList',option)
        }
    })
}
// 删除设备分组
export function delCellphoneGroupData({commit},option) {
    axios.get('/cellphone/delGroup',{
        params: {
            id:option.id
        }
    }).then((data) => {
        if (data.data == 'success') {
            commit('delGroupList',option)
        }
    })
}

// 获取用户数据列表
export function getUserList({commit}) {
    axios.get('/users/allMessage').then((data) => {
        commit('getAllUserData',data.data)
    })
}
// 添加用户分组
export function addUserGroup({commit},option) {
    console.log(localStorage.getItem("token"))
    option.token = localStorage.getItem("token")
    axios.post('/users/addGroupData',option).then((data) => {
        if(data.data == 'success') {
            axios.get('/users/allMessage').then((data) => {
                commit('getAllUserData',data.data)
            })
        }
    })
}
// 删除用户分组
export function delUserGroup({commit},option) {
    axios.get('/users/delGroupData',{
        params: {
            id:option.id
        }
    }).then((data) => {
        commit('delUserGroup',option)
    })
}
// 删除部门数据
export function delDepartment({commit},option) {
    console.log(option)
    // axios.get('/users/delDepartmentData',{
    //     params: {
    //         code:option.code
    //     }
    // }).then((data) => {
    //     // commit('delDepartment',option)
    //     console.log(data.data)
    // })
}
// 添加部门数据
export function addDepartment({commit},option) {
    axios.post('/users/addDepartmentData',option).then((data) => {
        if (data.data == 'success') {
            axios.get('/users/allMessage').then((data) => {
                commit('getAllUserData',data.data)
            })
        }
    })
}
// 变更部门数据
export function changeDepartment({commit},option) {
    axios.post('/users/changeDepartmentData',option)
}
// 关联部门
export function relevanceDepartment({commit},option) {
    axios.post('/users/relevanceDepartment',option).then((data) => {
       if(data.data == 'success') {
        axios.get('/user/allMessage').then((data) => {
            commit('getAllUserData',data.data)
        })
       }
    })
}

// 获取推送历史信息列表
export function getPushHistory({commit}) {
    axios.get('/push/historyList').then((data) => {
        commit('pushHistoryList',data.data)
    })
}
// 删除历史列表数据
export function delPushHistory({commit},delAry) {
    axios.post('/push/delHistoryData',delAry).then((data) => {
        if (data.data.message === 'success') {
            commit('pushHistoryList',data.data.item)
        }
    })
}
// 添加推送信息
export function addInfromation({commit},from) {
    return axios.post('/push/addMessage',from)
}

// 获取推送对象 分组列表
export function getPushList({commit},str) {
    axios.get('/push/getGroup').then((data) => {
        let obj = data.data;
        obj.str = str;
        commit('allPushData',obj)
    })
}




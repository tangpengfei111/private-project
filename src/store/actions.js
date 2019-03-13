import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8000'


export function load({commit},option) {
    return axios.post('/adminLoad',option)
}

export function getCellList({commit},option) {
    axios.get('/allCellphoneList').then((data) => {
        commit('getCellListData',data.data)
    })
}

export function addCellphone({commit},option) {
    return axios.post('/addCellphone',option)
}

export function delCellphone({commit},option) {
    axios.get('/delCellphone',{
        params: {
            id:option.id
        }
    }).then((data) => {
        if (data.data === 'success') {
            commit('delCellListData',option)
        }
    })
}

export function getCellphoneList({commit}) {
    axios.get('/cellphoneGroupMessage').then((data) => {
        commit('getCellphoneGroupData',data.data)
    })
}

export function addCellphoneGroupData({commit},option) {
    axios.post('/addCellphoneGroup',option).then((data) => {
        if (data.data == 'success') {
            commit('addGroupList',option)
        }
    })
}

export function delCellphoneGroupData({commit},option) {
    axios.get('/delCellphoneGroup',{
        params: {
            id:option.id
        }
    }).then((data) => {
        if (data.data == 'success') {
            commit('delGroupList',option)
        }
    })
}


export function getUserList({commit}) {
    axios.get('/allUserMessage').then((data) => {
        commit('getAllUserData',data.data)
    })
}

export function addUserGroup({commit},option) {
    axios.post('/addUserGroupData',option).then((data) => {
        if(data.data == 'success') {
            axios.get('/allUserMessage').then((data) => {
                commit('getAllUserData',data.data)
            })
        }
    })
}

export function addDepartment({commit},option) {
    axios.post('/addDepartmentData',option).then((data) => {
        if (data.data == 'success') {
            axios.get('/allUserMessage').then((data) => {
                commit('getAllUserData',data.data)
            })
        }
    })
}

export function changeDepartment({commit},option) {
    axios.post('/changeDepartmentData',option)
}

export function delUserGroup({commit},option) {
    axios.get('/delUserGroupData',{
        params: {
            id:option.id
        }
    }).then((data) => {
        commit('delUserGroup',option)
    })
}
export function delDepartment({commit},option) {
    console.log(option)
    // axios.get('/delDepartmentData',{
    //     params: {
    //         code:option.code
    //     }
    // }).then((data) => {
    //     // commit('delDepartment',option)
    //     console.log(data.data)
    // })
}
export function relevanceDepartment({commit},option) {
    axios.post('/relevanceDepartment',option).then((data) => {
       if(data.data == 'success') {
        axios.get('/allUserMessage').then((data) => {
            commit('getAllUserData',data.data)
        })
       }
    })
}
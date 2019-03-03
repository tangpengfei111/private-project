import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8000'


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
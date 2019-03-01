import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8000'


export function getCellList({commit},option) {
    console.log(1)
    return axios.get('/allCellphoneList').then((data) => {
        console.log(2)
        commit('getCellListData',data.data)
    })
}
export function saveAdminInfo(state, adminInfo){
    state.adminInfo = adminInfo;
}

export function getCellListData(state,option) {
    state.cellphoneMessage = option;
}
export function getAllUserData(state,option) {
    state.userMessage = option.message;
    state.userGroup = option.group;
    state.departmentList = option.department;
    state.userMenusList = option.list;
}

export function delCellListData(state,option) {
    state.cellphoneMessage = state.cellphoneMessage.filter((item) => {
        return item.id !== option.id
    })
}

export function getCellphoneGroupData(state,option) {
    state.cellphoneGroup = option;
}

export function addGroupList(state,option) {
    if (option.id) {
        state.cellphoneGroup.forEach((item) => {
            if (item.id == option.id) {
                item.cellphoneGroup = option.cellphoneGroup;
                item.groupDescribe = option.groupDescribe;
            }
        })
    }else {
        state.cellphoneGroup.push(option)
    }
}

export function delGroupList(state,option) {
    state.cellphoneGroup = state.cellphoneGroup.filter((item) => {
        return item.id !== option.id
    })
}

export function userGroupVisibleIsShow(state) {
    state.userGroupVisible = !state.userGroupVisible;
} 

export function userDepartmentVisibleIsShow(state) {
    state.userDepartmentVisible = !state.userDepartmentVisible;
}

export function delUserGroup(state,option) {
    state.userGroup = state.userGroup.filter((item) => {
        return item.id != option.id;
    })
}
// export function delDepartment(state,option) {
//     state.departmentList = state.departmentList.filter((item) => {
//         return item.code != option.code;
//     })
// }
export function allPushData(state,option) {
    let til = option.str;
    if(til == '设备分组') {
        state.pushMessage = option.cellphone;
    }else if(til == '用户分组') {
        state.pushMessage = option.userGroup;
    }else if(til == '部门名称') {
        state.pushMessage = option.department;
    }
}
export function pushHistoryList(state,option) {
    state.pushHistoryList = option;
}
export function allAdminList(state,option) {
    state.adminList = option;
}
export function allLogList(state,option) {
    state.logList = option;
}
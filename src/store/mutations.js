export function getCellListData(state,option) {
    state.list = option;
}

export function delCellListData(state,option) {
    state.list = state.list.filter((item) => {
        return item.id !== option.id
    })
}

export function getCellphoneGroupData(state,option) {
    state.cellphoneGroupMessage = option;
}

export function addGroupList(state,option) {
    if (option.id) {
        state.cellphoneGroupMessage.forEach((item) => {
            if (item.id == option.id) {
                item.cellphoneGroup = option.cellphoneGroup;
                item.groupDescribe = option.groupDescribe;
            }
        })
    }else {
        state.cellphoneGroupMessage.push(option)
    }
}

export function delGroupList(state,option) {
    state.cellphoneGroupMessage = state.cellphoneGroupMessage.filter((item) => {
        return item.id !== option.id
    })
}

const state = {
    adminInfo:[],
    cellphoneMessage:[],               
    cellphoneGroup:[],
    userMessage:[],
    departmentList:[],
    userGroup:[],
    userMenusList:[],
    userGroupVisible:false,
    userDepartmentVisible:false
    
}
export default state

/* 
    cellphoneMessage     设备分组->设备管理
    cellphoneGroup      设备->设备分组
    userMessage  用户管理->用户管理 列表
    departmentList  用户管理->用户分组 列表
    userGroup   用户管理->部门分类  列表
    userMenusList  用户管理左侧菜单结构树列表
    userGroupVisible     控制用户分组编辑按钮dialog显示隐藏
    userDepartmentVisible  控制部门分类编辑按钮dialog显示隐藏
*/
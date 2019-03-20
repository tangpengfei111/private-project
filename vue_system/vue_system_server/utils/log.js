
module.exports = {
    curTime(Date) {
        let year = Date.getFullYear();
        let month = Date.getMonth();
        let date = Date.getDate();      
        let hour = Date.getHours();     
        let minutes = Date.getMinutes();  
        let second = Date.getSeconds(); 
        return `${year}年${month + 1}月${date}日 ${hour}:${minutes}:${second}`;
    },
    screen(data) {
        data = data.filter(item => {
            if (item.includes('用户不存在') || !item.includes(' 200 ')) {
            }else {
                return item;
            }
        })
       
        let arr = [];
        data.forEach(item => {
            var ary = item.split(' ');
            var obj = {
                "date": `${ary[0]} ${ary[1]}`,
                "user_name": ary[2],
                "url": ary[4],
                "status": ary[5],
                "responseTime": ary[6]
            }
            arr.push(obj)
        });
        
        arr.forEach(item => {
            let str = item.url.split('?')[0];
            switch (str) {
                case '/admin/load':
                    item.url = '用户登录'
                    break;
                case '/admin/register':
                    item.url = '注册用户'
                    break;
                case '/admin/exit':
                    item.url = '退出登录'
                    break;
                case '/admin/logList':
                    item.url = '获取日志列表信息'
                    break;
                case '/admin/list':
                    item.url = '获取管理员列表信息'
                    break;
                case '/push/historyList':
                    item.url = '请求推送历史信息'
                    break;
                case '/push/delHistoryData':
                    item.url = '删除推送历史信息'
                    break;
                case '/push/addMessage':
                    item.url = '添加推送信息'
                    break;
                case '/push/getGroup':
                    item.url = '获取推送对象分组'
                    break;
                case '/cellphone/allList':
                    item.url = '请求设备基本信息'
                    break;
                case '/cellphone/addItemData':
                    item.url = '添加手机设备'
                    break;
                case '/cellphone/delItemData':
                    item.url = '删除手机设备'
                    break;
                case '/cellphone/groupMessage':
                    item.url = '获取设备分组信息'
                    break;
                case '/cellphone/addGroup':
                    item.url = '添加设备分组'
                    break;
                case '/cellphone/delGroup':
                    item.url = '删除设备分组'
                    break;
                case '/users/allMessage':
                    item.url = '获取用户基本信息'
                    break;
                case '/users/addGroupData':
                    item.url = '添加用户分组'
                    break;
                case '/users/delGroupData':
                    item.url = '删除用户分组'
                    break;
                case '/users/delDepartmentData':
                    item.url = '删除部门类别'
                    break;
                case '/users/addDepartmentData':
                    item.url = '添加部门类别'
                    break;
                case '/users/changeDepartmentData':
                    item.url = '编辑部门信息'
                    break;
                case '/users/relevanceDepartment':
                    item.url = '关联部门'
                    break;
                default:
                    break;
            }
        })
        return arr;
    }
}




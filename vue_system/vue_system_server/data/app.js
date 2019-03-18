let fs = require('fs');
let http = require('http');
let url = require('url');
let express = require('express');



var app = express();

http.createServer(function (req,res) {
    // 使用url.parse 处理请求路径
    let {pathname,query} = url.parse(req.url,true);
    // pathname 路径名称   query 前端传的参数

    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','content-type');
    // option请求，需要一个响应 
    if (req.method == 'OPTIONS') {
        res.end();
        return;
    }


    // 用户登录
    if (pathname == '/adminLoad') {
        let str = '';
        req.on('data',function (d) {
            // post 传数据时 触发
            str += d
        })
        req.on('end',function() {
            let obj = JSON.parse(str);
            let option = {
                "status": '',
                "user_name": '',
                "user_id":'',
                "message": 'failure'
            }
            read('./data/adminData.json',(data) => {
                let ary = JSON.parse(data);
                ary.forEach((item) => {
                    if (item.user_name == obj.user_name && item.password == obj.password) {
                        item.status = "已登录";
                        option = {
                            "status": item.status,
                            "user_name": item.user_name,
                            "user_id": item.user_id,
                            "message": 'success'
                        }
                    }
                })
                str = JSON.stringify(option);
                write('./data/adminData.json',JSON.stringify(ary),() => {
                    res.end(str)
                })
            })        
        })
       
    }

    // 用户退出
    if (pathname == '/adminExitLogin') {
        let str = '';
        req.on('data',function (d) {
            str += d
        })
        req.on('end',function() {
            read('./adminData.json',(data) => {
                let obj = JSON.parse(str)
                let ary = JSON.parse(data);
                ary.forEach((item) => {
                    if(item.user_id == obj.user_id) {
                        item.status = '未登录'
                    }
                })
                write('./adminData.json',JSON.stringify(ary),() => {
                    res.end('success')
                })
            })
        })
       
    }

    // 所有设备列表
    if (pathname == '/allCellphoneList') {
        read('./data/basicData.json',(data) => {
            res.end(data)
        })
    }

    // 添加手机设备
    if (pathname == '/addCellphone') {
        let str = '';
        req.on('data',function (d) {
            // post 传数据时 触发
            str += d
        })
        req.on('end',function() {
            // 前端数据传递完毕时触发
            // 前端若是formData 传递，后台接收是一个 q=12&b=3类型的字符串
            // 若是axios 请求，后台获取的是一个json字符串
            let obj = JSON.parse(str);
            if (obj.id) {
                read('./data/basicData.json',(data) => {
                    let ary = JSON.parse(data);
                    for (let i = 0; i < ary.length; i++) {
                        if (ary[i].id == obj.id * 1) {
                            // 传来的数据 覆盖 后台数据中与 前端ID相同的那一项
                            ary[i] = obj
                        }
                    }
                    write('./data/basicData.json',JSON.stringify(ary),() => {
                        res.end('success')
                    })
                })
            }else {
                read('./data/basicData.json',(data) => {
                    let ary = JSON.parse(data);
                    obj.id = Math.random();
                    obj.cellphoneGroup = '';
                    // 添加ID为随机数 
                    ary.push(obj);
                    write('./data/basicData.json',JSON.stringify(ary),() => {
                        res.end('success')
                    })
                })
            }
        })
    }

    // 删除手机设备
    if (pathname === '/delCellphone') {
        read('./data/basicData.json',(data) => {
            let id = query.id;
            if (id === undefined) {
                res.end('no ID')
            }else {
                let ary = JSON.parse(data);
                ary = ary.filter((item) => {
                    return item.id !== (id * 1);
                })
                write('./data/basicData.json',JSON.stringify(ary),() => {
                    // 重新写入数据 已经筛选出ID和前端相同的项(删除)
                    res.end('success')
                })
            }
        })
    }
    
    // 所有设备信息
    if (pathname === '/cellphoneGroupMessage') {
        read('./data/cellphoneGroupData.json',(data) => {
            res.end(data)
        })
    }

    // 添加设备分组
    if (pathname === '/addCellphoneGroup') {
        let str = '';
        req.on('data',function (d) {
            str += d
        })
        req.on('end',function() {
            let obj = JSON.parse(str);
            read('./data/cellphoneGroupData.json',(data) => {
                let ary = JSON.parse(data);
                if (obj.id) {
                    for (let i = 0; i < ary.length; i++) {
                        if (ary[i].id == obj.id) {
                            ary[i] = obj
                        }
                    }
                }else {
                    obj.id = Math.random();
                    ary.push(obj);
                }
                write('./data/cellphoneGroupData.json',JSON.stringify(ary),() => {
                    res.end('success')
                })
            })
        })
    }

    // 删除设备分组
    if (pathname == '/delCellphoneGroup') {
        read('./data/cellphoneGroupData.json',(data) => {
            let id = query.id;
            let ary = JSON.parse(data);
            ary = ary.filter((item) => {
                return item.id !== (id * 1);
            })
            write('./cellphoneGroupData.json',JSON.stringify(ary),() => {
                res.end('success')
            })
        })
    }

    // 获取用户信息
    if (pathname === '/allUserMessage') {
        retrieveUser();
        let timer = null, t = 0;
        timer = setInterval(() => {
            read('./data/userData.json',(data) => {
                res.end(data)
            })
            t += 10;
            if (t == 20) {
                clearInterval(timer);
            }
        },10)
        
    }
    // 删除部门数据
    if (pathname === '/delDepartmentData') {
        read('./data/userData.json',(data) => {
            let code = query.code;
            if (code === undefined) {
                res.end('没有此部门代码')
            }else {
                let d = JSON.parse(data);
                let ary = d.department;
                let arr = [];
                for (let i = 0; i < ary.length; i++) {
                    // if (ary[i].code == code && ) 
                }
                d.department = ary;
                let list = getTress(ary,0);
                d.list = list;
                write('./data/user1Data.json',JSON.stringify(d),() => {
                    // 重新写入数据 已经筛选出ID和前端相同的项(删除)
                    res.end('success')
                })
            }
        })
    }
    // 添加部门数据
    if (pathname === '/addDepartmentData') {
        let str = '',ary;
        req.on('data',function (d) {
            str += d
        })
        req.on('end',function() {
            let obj = JSON.parse(str);
            obj.mumbers = [];
            if (!obj.higherCode) {
                obj.higherCode = 0;
                obj.type = 'NODE';
            }else {
                obj.type = 'LINK';
            }
            read('./data/userData.json',(data) => {
                let d = JSON.parse(data);
                ary = d.department
                ary.push(obj);
                d.department = ary;
                let list = getTress(ary,0)
                d.list = list;
                write('./data/userData.json',JSON.stringify(d),() => {
                    res.end('success')
                })
            })
        })
    }
    // 变更部门数据
    if (pathname === '/changeDepartmentData') {
        let str = '';
        req.on('data',function (d) {
            str += d
        })
        req.on('end',function() {
            let obj = JSON.parse(str);
            read('./data/userData.json',(data) => {
                let d = JSON.parse(data);
                let ary = d.department;
                for (let i = 0; i < ary.length; i++) {
                    if (ary[i].code == obj.code) {
                       for(let k in ary[i]) {
                           if(obj[k]) {
                               ary[i][k] = obj[k];
                           }
                       }
                    }
                }
                d.department = ary;
                let list = getTress(ary,0);
                d.list = list;
                write('./data/userData.json',JSON.stringify(d),() => {
                    res.end('success')
                })
            })
        })
    }
    
    // 关联部门
    if (pathname === '/relevanceDepartment') {
        let str = '';
        req.on('data',function (d) {
            str += d
        })
        req.on('end',function() { 
            let obj = JSON.parse(str);
            read('./data/userData.json',(data) => {
                let d = JSON.parse(data);
                let messageList = d.message;
                let change = [],itemObj = {};
                messageList.forEach((item) => {
                    for (let i = 0; i < obj.itemData.length; i++) {
                        if (item.id == obj.itemData[i]) {
                            if(item.department != '其他') {
                                itemObj = {
                                    "name":item.department,
                                    "id": item.id
                                }
                                change.push(itemObj);
                            }
                            item.department = obj.selectDepartment;          
                        }
                    }
                })
                let ary = d.department;
                ary.forEach((item) => {
                    if (change != []) {
                        for (let i = 0; i < change.length; i++) {
                            if (change[i].name == item.name) {
                                item.members = item.members.filter(cur => {
                                    return cur != change[i].id;
                                })
                            }
                        }
                    }
                    if (item.name == obj.selectDepartment || item.code == obj.rootCode) {
                        item.members = item.members.concat(obj.itemData);
                        item.members = universe(item.members);
                    }
                })
                d.department = ary;
               
                let list = getTress(ary,0);
                d.list = list;
                write('./data/userData.json',JSON.stringify(d),() => {
                    res.end('success')
                })
            })
        })
    }


    // 添加用户组
    if (pathname === '/addUserGroupData') {
        let str = '';
        req.on('data',function (d) {
            str += d
        })
        req.on('end',function() {
            let obj = JSON.parse(str);
            if (obj.members == 'undefined') {
                obj.members = [];
            }
            read('./data/userData.json',(data) => {
                let d = JSON.parse(data);
                let ary = d.group;
                if (obj.id) {
                    for (let i = 0; i < ary.length; i++) {
                        if (ary[i].id == obj.id) {
                            ary[i] = obj
                        }
                    }
                }else {
                    obj.id = Math.random();
                    ary.push(obj);
                }
                d.group = ary;
                write('./data/userData.json',JSON.stringify(d),() => {
                    res.end('success')
                })
            })
        })
    }

    // 删除用户组
    if (pathname == '/delUserGroupData') {
        read('./data/userData.json',(data) => {
            let id = query.id;
            let d = JSON.parse(data);
            let ary = d.group;
            ary = ary.filter((item) => {
                return item.id !== (id * 1);
            })
            d.group = ary;
            write('./data/userData.json',JSON.stringify(d),() => {
                res.end('success')
            })
        })
    }

    // 获取推送历史列表
    if (pathname == '/allPushHistory') {
        read('./data/pushMessage.json',(data) => {
            res.end(data)
        })
    }

    // 添加推送消息
    if (pathname == '/addPushMassage') {
        let str = '';
        req.on('data',function (d) {
            str += d
        })
        req.on('end',function() {
            let obj = JSON.parse(str);
            read('./data/pushMessage.json',(data) => {
                let ary = JSON.parse(data);
                obj.id = Math.random();
                ary.push(obj)
                write('./data/pushMessage.json',JSON.stringify(ary),() => {
                    res.end('success')
                })
            })
        })
    }
    
    // 删除推送消息
    if (pathname == '/delPushHistoryData') {
        let str = '';
        req.on('data',function (d) {
            str += d
        })
        req.on('end',function() {
            let ary = JSON.parse(str);
            read('./data/pushMessage.json',(data) => {
                let arr = JSON.parse(data);
                ary.forEach(i => {
                    arr = arr.filter(item => {
                        return item.id != i;
                    })
                })
                let obj = {
                    item: arr,
                    message: 'success'
                }
                write('./data/pushMessage.json',JSON.stringify(arr),() => {
                    res.end(JSON.stringify(obj))
                })
            })
        })
    }

    // 获取信息列表
    if (pathname == '/getPushData') {
        let obj = {
           cellphone: [],
           userGroup: [],
           department: []
        };
        read('./data/cellphoneGroupData.json',(data) => {
            let ary = JSON.parse(data)
            ary.forEach(item => {
                obj.cellphone.push(item.cellphoneGroup)
            })
            read('./data/userData.json',(data) => {
                let d = JSON.parse(data)
                d.group.forEach(item => {
                    obj.userGroup.push(item.name)
                })
                d.department.forEach(item => {
                    obj.department.push(item.name)
                })
                res.end(JSON.stringify(obj))
            })
        })
    }

    




    
}).listen('8000',function() {
    console.log('成功启动8000端口')
})

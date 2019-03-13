let fs = require('fs');
let http = require('http');
let url = require('url');

// 读取数据函数
function read(url,callback) {
    fs.readFile(url,'utf-8',(err,data) => {
        if (!err) {
            callback && callback(data);
        }
    })
}

// 写入数据函数
function write(url,data,callback) {
    fs.writeFile(url,data,'utf-8',(err) => {
        if (!err) {
            callback && callback();
        }
    })
}

// 数组去重
function universe(ary) {
    let arr = [];
    ary.forEach(item => {
        arr.indexOf(item) == -1 ? arr.push(item) : null;
    })
    return arr;
}



        /**
     * 树状的算法
     * @params list     代转化数组
     * @params parentId 起始节点
     */
    function getTress(list, parentId,code) {
        let items= {};
        // 获取每个节点的直属子节点，*记住是直属，不是所有子节点
        for (let i = 0; i < list.length; i++) {
            let key = list[i].higherCode;
            if (items[key]) {
                items[key].push(list[i]);
            } else {
                items[key] = [];
                items[key].push(list[i]);
            }
        }
        if (code == 'undefined') {
            return find(items,parentId,code);
        }else {
            return formatTree(items, parentId);
        }
    }
    /**
     * 利用递归格式化每个节点
     */
    function formatTree(items, parentId) {
        let result = [],children = {};
        if (!items[parentId]) {
            return null;
        }

        for (let t of items[parentId]) {
            t.state = "ENABLE";
            children.childs = formatTree(items, t.code)
            let obj = {
                "entity":t,
                "childs": children.childs
            }
            result.push(obj);
        }
        return result;
    }

// function find(items, parentId,code) {
//     let result = [],children = {};
//     if (!items[parentId]) {
//         return null;
//     }

//     for (let t of items[parentId]) {
//         t.state = "ENABLE";
//         children.childs = formatTree(items, t.code)
//         let obj = {
//             "entity":t,
//             "childs": children.childs
//         }
//         result.push(obj);
//     }
//     return result;
// }



// 初始化用户数据
function retrieveUser() {
    fs.readFile('./data/basicData.json','utf-8',(err,data) => {
        if (!err) {
            let ary = [];
            var obj = {}
            let d = JSON.parse(data);
            for (let i = 0; i < d.length; i++) {
                obj = {
                   "phone":d[i].name,
                   "state":d[i].state,
                   "id":d[i].id
                }
                ary.push(obj)
            }
            fs.readFile('./data/userData.json','utf-8',(err,data) => {
                if (!err) {
                    let str = JSON.parse(data);
                    str.message.forEach((item) => {
                        for (let j = 0; j < ary.length; j++) {
                            if (ary[j].id == item.id) {
                                
                                ary[j].department = item.department;
                                ary[j].name = item.name;
                            }
                        }
                    })
                    str.message = ary;
                    fs.writeFile('./data/userData.json',JSON.stringify(str),'utf-8',(err) => {
                        if(err) {
                            console.log(err)
                        }
                    })
                }
            })
        }
    
    })
}


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
    
}).listen('8000',function() {
    console.log('成功启动8000端口')
})

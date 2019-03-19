const express = require('express');
const router = express.Router();
const utils = require('../utils/utils');


// 获取用户信息
router.get('/allMessage',function(req, res) {
    utils.retrieveUser();
    utils.read('./data/userData.json',(data) => {
        res.send(data)
    })
})

// 添加用户组
router.post('/addGroupData',function(req, res) {
    let obj = req.body;
    if (obj.members == 'undefined') {
        obj.members = [];
    }
    utils.read('./data/userData.json',(data) => {
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
        utils.write('./data/userData.json',JSON.stringify(d),() => {
            res.send('success')
        })
    })
}) 


// 删除用户组
router.get('/delGroupData',function(req, res) {
    let id = req.query.id;
    utils.read('./data/userData.json',(data) => {
        let d = JSON.parse(data);
        let ary = d.group;
        ary = ary.filter((item) => {
            return item.id !== (id * 1);
        })
        d.group = ary;
        utils.write('./data/userData.json',JSON.stringify(d),() => {
            res.send('success')
        })
    })
}) 


// // 删除部门数据
// router.get('/delDepartmentData',function(req, res, next) {
//     utils.read('./data/userData.json',(data) => {
//         // let code = query.code;
//         // if (code === undefined) {
//         //     res.end('没有此部门代码')
//         // }else {
//         //     let d = JSON.parse(data);
//         //     let ary = d.department;
//         //     let arr = [];
//         //     for (let i = 0; i < ary.length; i++) {
//         //         // if (ary[i].code == code && ) 
//         //     }
//         //     d.department = ary;
//         //     let list = getTress(ary,0);
//         //     d.list = list;
//         //     write('./data/user1Data.json',JSON.stringify(d),() => {
//         //         // 重新写入数据 已经筛选出ID和前端相同的项(删除)
//         //         res.end('success')
//         //     })
//         // }
//     })
// })

// 添加部门数据
router.post('/addDepartmentData',function(req, res) {
    let obj = req.body
    obj.mumbers = [];
    if (!obj.higherCode) {
        obj.higherCode = 0;
        obj.type = 'NODE';
    }else {
        obj.type = 'LINK';
    }    
    utils.read('./data/userData.json',(data) => {
        let d = JSON.parse(data);
        ary = d.department;
        ary.push(obj);
        d.department = ary;
        let list = utils.getTress(ary,0);
        d.list = list;
        utils.write('./data/userData.json',JSON.stringify(d),() => {
            res.send('success')
        })
    })  
})

// 变更部门数据
router.post('/changeDepartmentData',function(req,res) {
    let obj = req.body;
    utils.read('./data/userData.json',(data) => {
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
        let list = utils.getTress(ary,0);
        d.list = list;
        utils.write('./data/userData.json',JSON.stringify(d),() => {
            res.send('success')
        })
    })
})


// 关联部门
router.post('/relevanceDepartment',function(req, res) {
    let obj = req.body;
    utils.read('./data/userData.json',(data) => {
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
                item.members = utils.universe(item.members);
            }
        })
        d.department = ary;
        let list = utils.getTress(ary,0);
        d.list = list;
        write('./data/userData.json',JSON.stringify(d),() => {
            res.send('success')
        })
    })
})

module.exports = router;
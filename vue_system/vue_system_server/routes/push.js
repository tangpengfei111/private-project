const express = require('express');
const router = express.Router();
const utils = require('../utils/utils');


// 获取推送历史列表
router.get('/historyList',function (req,res) {
    utils.read('./data/pushMessage.json',(data) => {
        res.send(data);
    })
})

// 删除历史列表数据
router.post('/delHistoryData',function (req,res) {
    let ary = req.body;
    utils.read('./data/pushMessage.json',(data) => {
        let arr = JSON.parse(data);
        if (ary.length == 1) {
            arr = arr.filter(item => {
                return item.id !== (ary[0].id * 1);
            })
        }
        ary.forEach(i => {
            arr = arr.filter(item => {
                return item.id !== (i.id * 1);
            })
        })
        ary = [];
        arr.forEach(item => {ary.push(item.id)})
        let obj = {
            item: ary,
            message: 'success'
        }
        write('./data/pushMessage.json',JSON.stringify(arr),() => {
            res.send(JSON.stringify(obj))
        })
    })
})

// 添加推送消息
router.post('/addMessage',function (req,res) {
    let obj = req.body;
    utils.read('./data/pushMessage.json',(data) => {
        let ary = JSON.parse(data);
        obj.id = Math.random();
        ary.push(obj)
        utils.write('./data/pushMessage.json',JSON.stringify(ary),() => {
            res.send('success')
        })
    })    
})

// 获取推送对象 分组列表
router.get('/getGroup',function (req,res) {
    let obj = {
        cellphone: [],
        userGroup: [],
        department: []
    };
    utils.read('./data/cellphoneData.json',(data) => {
        let d = JSON.parse(data);
        d.group.forEach(item => {
            obj.cellphone.push(item.name)
        })
        utils.read('./data/userData.json',(data) => {
            let d = JSON.parse(data)
            d.group.forEach(item => {
                obj.userGroup.push(item.name)
            })
            d.department.forEach(item => {
                obj.department.push(item.name)
            })
            res.send(JSON.stringify(obj))
        })
    })
})


module.exports = router;
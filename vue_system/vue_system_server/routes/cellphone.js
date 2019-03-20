const express = require('express');
const router = express.Router();
const utils = require('../utils/utils')



// 所有设备列表
router.get('/allList',function (req,res) {
    utils.read('./data/cellphoneData.json',(data) => {
        let d = JSON.parse(data);
        res.send(d.basic);
    })
})

// 添加手机设备
router.post('/addItemData',function (req,res) {
    let obj = req.body;
    if (obj.id) {
        utils.read('./data/cellphoneData.json',(data) => {
            let d = JSON.parse(data);
            let ary = d.basic;
            for (let i = 0; i < ary.length; i++) {
                if (ary[i].id == obj.id * 1) {
                    ary[i] = obj;
                }
            }
            d.basic = ary;
            utils.write('./data/cellphoneData.json',JSON.stringify(d),() => {
                res.send('success');
            })
        })
    }else {
        utils.read('./data/cellphoneData.json',(data) => {
            let d = JSON.parse(data);
            let ary = d.basic;
            obj.id = Math.random();
            obj.cellphoneGroup = '';
            ary.push(obj);
            d.basic = ary;
            utils.write('./data/cellphoneData.json',JSON.stringify(d),() => {
                res.send('success');
            })
        })
    }   
})

// 删除手机设备
router.get('/delItemData',function (req,res) {
    let id = req.query.id;
    utils.read('./data/cellphoneData.json',(data) => {
        if (id === undefined) {
            res.send('no ID');
        }else {
            let d = JSON.parse(data);
            let ary = d.basic;
            ary = ary.filter((item) => {
                return item.id !== parseFloat(id);
            })
            d.basic = ary;
            utils.write('./data/cellphoneData.json',JSON.stringify(d),() => {
                res.send('success');
            })
        }
    })
})

// 所有设备分组信息
router.get('/groupMessage',function(req,res) {
    utils.read('./data/cellphoneData.json',(data) => {
        let d = JSON.parse(data);
        res.send(d.group);
    })
})

// 添加设备分组
router.post('/addGroup',function(req,res) {
    let obj = req.body;
    utils.read('./data/cellphoneData.json',(data) => {
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
        utils.write('./data/cellphoneData.json',JSON.stringify(d),() => {
            res.send('success')
        })
    })  
})

// 删除设备分组
router.get('/delGroup',function(req,res) {
    let id = req.query.id;
    utils.read('./data/cellphoneData.json',(data) => {
        let d = JSON.parse(data);
        let ary = d.group;
        ary = ary.filter((item) => {
            return item.id !== (id * 1);
        })
        d.group = ary;
        utils.write('./data/cellphoneData.json',JSON.stringify(d),() => {
            res.send('success')
        })
    })
})

module.exports = router;
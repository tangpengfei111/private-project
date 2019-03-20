var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var jwt = require('../utils/jwt');
var utility = require('utility');
var fs = require('fs');
var path = require('path')
var log = require('../utils/log')

// 密码加密
function md5Pwd(pwd) {
    let salt = 'this_is+a?$#@salt__&*%'
    return utility.md5(utility.md5(salt+pwd))
}

// 登录
router.post('/load', function (req, res) {
  let name = req.body.username;
  let pass = md5Pwd(req.body.password); 
  utils.read('./data/adminData.json',(data) => {
    let ary = JSON.parse(data);
    var flag = 0;
    for(let i = 0; i < ary.length; i++) {
      if (ary[i].user_name == name) {
        if (ary[i].password == pass) {
          let option = {
            user_name: ary[i].user_name,
            user_id: ary[i].user_id,
            user_permissions: ary[i].user_permissions
          }
          let token = jwt.generateToken(option);
          ary[i].state = '已登录';
          fs.writeFileSync('./data/adminData.json',JSON.stringify(ary),'utf-8');
          return res.send({status:210,msg:'登录成功',token:token})
        }
        flag++;
      }
    }
    return flag ?  res.send({status:400,msg:'帐号密码不匹配'}) : res.send({status:404,msg:'用户未注册'});
  })
});

// 注册添加
router.post('/register', function (req, res) { 
  if (req.body.username && req.body.password) {
    let name = req.body.username,
        pass = md5Pwd(req.body.password),
        id = Math.random() * 100000000000000000;
    let date = log.curTime(new Date());
    let obj = {
        user_id: id,
        user_name: name,
        password: pass,
        user_phone: req.body.phone,
        user_mail: req.body.mail,
        user_age: req.body.age,
        user_permissions:'普通管理',
        registerTime: date
    }
    utils.read('./data/adminData.json', (data) => {
      let ary = JSON.parse(data);
      let flag = 0;
      ary.forEach((item) => {
        if (item.user_name == name || item.user_id == id) {
            flag ++;
        }
      })
      if(flag) {
        return res.send({status:100,msg:'用户名已注册'})
      }else {
        obj.state = '未登录';
        ary.push(obj);
      }
      utils.write('./data/adminData.json', JSON.stringify(ary),()=> {
        return res.send({status:110,msg:'注册成功'})
      })
    })
  }else {
    return;
  }
});


//退出
router.post('/exit', function (req, res) {
  let token = req.body.token.replace(/["']/g,'');
  let result = jwt.verifyToken(token);
  let id = result.data.user_id;
  utils.read('./data/adminData.json', (data) => {
    let ary = JSON.parse(data);
    ary.forEach((item) => {
      if (item.user_id == id) {
        item.state = '未登录'
      }
    })
    utils.write('./data/adminData.json', JSON.stringify(ary),(data) => {
      res.send({status:220,msg:'退出成功'})
    })
  })
})

// 数据列表
router.get('/list',function (req,res) {
  utils.read('./data/adminData.json',(data) => {
    let d = JSON.parse(data);
    let arr = [], obj = {};
    d.forEach(item => {
      if (item.user_permissions != '超级管理员') {
        obj = {
          user_name: item.user_name,
          user_phone: item.user_phone,
          user_mail: item.user_mail,
          user_permissions: item.user_permissions,
          registerTime: item.registerTime
        }
        arr.push(obj);
      }
    })
    res.send(arr);
  })
})

// 日志列表
router.get('/logList',function (req,res) {
  let time = req.query.time;
  let url = path.join(__dirname,`log/access-${time}.log`);
  url = url.replace('\\routes','')
  utils.read(url,(data) => {
      if (typeof data != 'string') return;
      var ary = data.split('\n')
      ary.splice(ary.length-1,1);
      ary = log.screen(ary);
      ary = ary.reverse();
      res.send(ary)
  })
})



module.exports = router;
var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var jwt = require('../utils/jwt');
var utility = require('utility');

// 密码加密
function md5Pwd(pwd) {
    let salt = 'this_is+a?$#@salt__&*%'
    return utility.md5(utility.md5(salt+pwd))
}

// 管理员登录
router.post('/load', function (req, res, next) {
  let name = req.body.username;
  let pass = md5Pwd(req.body.password); 
  utils.read('./data/adminData.json', (data) => {
    let ary = JSON.parse(data);
    ary.forEach((item) => {
      if (item.user_name == name) {
        if (item.password == pass) {
          let option = {
            user_name: item.user_name,
            user_id: item.user_id
          }
          let token = jwt.generateToken(option);
          res.send({status:200,msg:'登录成功',token:token})
        }else {
          res.send({status:400,msg:'帐号密码错误'})
        }
      }else {
        res.send({status:404,msg:'帐号未注册'})
      }
    })
  })
});

// 注册添加
router.post('/register', function (req, res, next) {    
  if (req.body.username && req.body.password) {
    let name = req.body.username,
        pass = md5Pwd(req.body.password),
        id = Math.random();
    let obj = {
        user_id: id,
        user_name: name,
        password: pass
    }
    utils.read('./data/adminData.json', (data) => {
      let ary = JSON.parse(data);
      ary.forEach((item) => {
        if (item.user_name == name || item.user_id == id) {
            res.send({status:100,msg:'已注册'})
        }else {
            ary.push(obj)
        }
      })
      utils.write('./data/adminData.json', JSON.stringify(ary),()=> {
        res.send({status:110,msg:'注册成功'})
      })
    })
  }else {
    return;
  }
});


//管理员退出
router.post('/exit', function (req, res, next) {
  let obj = req.body;
  utils.read('./adminData.json', (data) => {
    let ary = JSON.parse(data);
    ary.forEach((item) => {
      if (item.user_id == obj.user_id) {
        item.state = '未登录'
        res.send('success')
      }
    })
  })
})



module.exports = router;
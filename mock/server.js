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

    // 所有设备列表
    if (pathname == '/allCellphoneList') {
        read('./basicData.json',(data) => {
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
                read('./basicData.json',(data) => {
                    let ary = JSON.parse(data);
                    for (let i = 0; i < ary.length; i++) {
                        if (ary[i].id == obj.id) {
                            // 传来的数据 覆盖 后台数据中与 前端ID相同的那一项
                            ary[i] = obj
                        }
                    }
                    write('./basicData.json',JSON.stringify(ary),() => {
                        res.end('sucess')
                    })
                })
            }else {
                read('./basicData.json',(data) => {
                    let ary = JSON.parse(data);
                    obj.id = Math.random(); 
                    // 添加ID为随机数 
                    ary.push(obj);
                    write('./basicData.json',JSON.stringify(ary),() => {
                        res.end('sucess')
                    })
                })
            }
        })
    }

    // 删除手机设备
    if (pathname == '/delCellphone') {
        read('./basicData.json',(data) => {
            let id = query.id;
            if (id === undefined) {
                res.end('no ID')
            }else {
                let ary = JSON.parse(data);
                ary = ary.filter((item) => {
                    return item.id !== id;
                })
                write('./basicData.json',JSON.stringify(ary),() => {
                    // 重新写入数据 已经筛选出ID和前端相同的项(删除)
                    res.end('success')
                })
            }
        })
    }

    // 添加设备分组
    if (pathname == 'addCellphoneGroup') {

    }

    // 删除设备分组
    if (pathname == 'delCellphoneGroup') {
        
    }





}).listen('8000',function() {
    console.log('成功启动8000端口')
})

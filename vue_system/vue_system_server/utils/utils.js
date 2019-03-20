let fs = require('fs')

module.exports = {
    // 读取数据函数
    read(url,callback) {
        fs.readFile(url,'utf-8',(err,data) => {
            if (!err) {
                return callback && callback(data);
            }
        })
    },
    // 写入数据函数
    write(url,data,callback) {
        fs.writeFile(url,data,'utf-8',(err) => {
            if (!err) {
                return callback && callback();
            }
        })
    },
    handMD5(str) {
        str = str.substring(4, str.length - 4);
        str = str.split('').reverse();
        return str.join('');
    },
    universe(ary) {
        let arr = [];
        ary.forEach(item => {
            arr.indexOf(item) == -1 ? arr.push(item) : null;
        })
        return arr;
    },
    getTress(list, parentId,code) {
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
            return this.formatTree(items, parentId);
        }
    },
    formatTree(items, parentId) {
        let result = [],children = {};
        if (!items[parentId]) {
            return null;
        }
    
        for (let t of items[parentId]) {
            t.state = "ENABLE";
            children.childs = this.formatTree(items, t.code)
            let obj = {
                "entity":t,
                "childs": children.childs
            }
            result.push(obj);
        }
        return result;
    },
    
    // 初始化数据
    retrieveUser() {
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
}

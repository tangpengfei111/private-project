const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

module.exports = {
    generateToken(data) {
        let created = Math.floor(Date.now() / 1000);
        let secretPiv = fs.readFileSync(path.join(__dirname, '../pem/pri.key'));
        let token = jwt.sign({
            data, 
            exp: created + 600 * 30
        }, secretPiv, {algorithm:'RS256'});
        return token;
    },
    verifyToken(token) {
        let secretPub = fs.readFileSync(path.join(__dirname, '../pem/pub.key'));
        let res = null;
        try {
            let result = jwt.verify(token, secretPub, {algorithms: ['RS256']}) || {};
            let {exp = 0} = result, current = Math.floor(Date.now() / 1000);
            if (current <= exp) {
                res = result || {};
            }
        } catch (e) {
            res = 'err';
        }
        return res;
    }
}
   



const crypto = require('crypto');

class Constant {
    constructor(User) {
        this.user = User;
    }

    getPrivateKey() {
        let temp = Date.now().toString(),
            hash = crypto.createHash('sha256');

        this.user.privateKey = hash.update(temp).digest('hex');
        return this;
    }

    getHash() {
        let {privateKey, password} = this.user,
            hmac = crypto.createHmac('sha256', privateKey);

        this.user.password = hmac.update(password).digest('hex');
        // console.log(`the input username${this.user.username},password${this.user.password}`);
        return this;
    }

    compareUser(obj) {
        return this.user.username === obj.username && this.user.password === obj.password;
    }
}

module.exports = Constant;
// module.exports = {
//     MD5_SUFFIX: '我是一个固定长度的盐值',
//     getHash: function(pwd, privateKey = this._privateKey) {
//         let hmac = crypto.createHmac('sha256', privateKey),
//             password = hmac.update(pwd).digest('hex');
//         return { password, privateKey};
//     },
//     getPrivateKey: function(){
//         let temp = Date.now().toString(),
//             hash = crypto.createHash('sha256');
//         this._privateKey = hash.update(temp).digest('hex');
//         return this;
//     },
//     secretKey: 'Why_So_Serious'
// };



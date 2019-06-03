const crypto = require('crypto');

module.exports = {
    MD5_SUFFIX: '我是一个固定长度的盐值',
    getHash: (pwd) => {
        let temp = Date.now().toString(),
            hash = crypto.createHash('sha256'),
            privateKey = hash.update(temp);
        hmac = crypto.createHmac('sha256', 'privateKey');
        password = hmac.update(pwd).digest('hex');
        return { password, privateKey};
    },
    secretKey: 'Why_So_Serious'
};

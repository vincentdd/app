var User = require('../models/book');

exports.sign_up = function(req, res) {
    User.create(req.body, (err, user) => {
        if (err) {
            res.json(err);
        } else {
            res.json(user);
        }
    });
}
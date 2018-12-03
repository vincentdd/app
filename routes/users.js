const  express = require('express');
const  router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({})
    .sort({ update_at: -1 })
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.log(2);
      res.json(err);
    });
});

router.post('/', function(req, res, next) {
  User.create(req.body, (err, user) => {
    if (err) {
      res.json(err);
    } else {
      res.json(user);
    }
  });
});

module.exports = router;

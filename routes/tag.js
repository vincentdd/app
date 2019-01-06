const  express = require('express');
const  router = express.Router();
const tag_controller = require('../controllers/tagController');

router.get('/', tag_controller.find_all);

router.post('/', );

module.exports = router;

const  express = require('express');
const  router = express.Router();
const tag_controller = require('../controllers/tagController');
//tag 页面
router.get('/', tag_controller.find_all);

router.post('/', tag_controller.add_tag);

// router.get('/:id', tag_controller.find_by_id);
router.route('/:id')
    .get(tag_controller.find_by_id)
    .put(tag_controller.tag_update);

// router.post('', tag_controller.find_one);
module.exports = router;

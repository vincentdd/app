const  express = require('express');
const  router = express.Router();
const tag_controller = require('../controllers/tagController');
//tag 页面
router.get('/', tag_controller.findAll);

router.post('/', tag_controller.createTag);

// router.get('/:id', tag_controller.find_by_id);
router.route('/:id')
    .get(tag_controller.findByID)
    .put(tag_controller.tagUpdate)
    .delete(tag_controller.deleteTag);

// router.post('', tag_controller.find_one);
module.exports = router;

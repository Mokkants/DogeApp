const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/post.controller');


router.get('/:id', post_controller.post_details);
router.get('/', post_controller.post_all_details);
router.post('/', post_controller.post_create);
router.put('/:id', post_controller.post_add);
router.delete('/:id', post_controller.post_delete);
module.exports = router;
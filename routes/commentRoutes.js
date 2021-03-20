const express = require('express');
const commentController = require('../controllers/commentController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/comments/:id', commentController.comments_blog_get);
router.post('/create-comment', requireAuth, commentController.comment_create_post);
router.delete('/delete-comment/:id', requireAuth, commentController.comment_delete);

module.exports = router;
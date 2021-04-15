const express = require('express');
const commentController = require('../controllers/commentController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/comments/:id', commentController.comments_blog_get);
router.post('/create-comment', requireAuth, commentController.comment_create_post);
router.put('/edit-user/:id', requireAuth, commentController.comment_edit)
router.delete('/delete-comment/:id', requireAuth, commentController.comment_delete);

module.exports = router;
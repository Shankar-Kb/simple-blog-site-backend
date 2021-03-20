const express = require('express');
const blogController = require('../controllers/blogController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/blogs/all', blogController.blogs_all);
router.get('/blogs/user/:id', requireAuth, blogController.blogs_user_get);
router.post('/create-blog', requireAuth, blogController.blog_create_post);
router.get('/blog/:id', blogController.blog_details);
router.delete('/blog/:id', blogController.blog_delete);

module.exports = router;
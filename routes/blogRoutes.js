const express = require('express');
const blogController = require('../controllers/blogController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/blogs/all', blogController.blog_index);
router.post('/create-blog', requireAuth, blogController.blog_create_post);
router.get('/blog/:id', blogController.blog_details);
router.delete('/blog/:id', blogController.blog_delete);

module.exports = router;
const { Router } = require('express');
const userController = require('../controllers/userController');
const { checkUser, requireAuth, requireRole } = require('../middleware/authMiddleware');

const router = Router();

router.post('/signup', userController.signup_post);
router.post('/login', userController.login_post);
router.get('/logout', userController.logout_get);
router.get('/login-check', checkUser);
router.post('/show-users', requireAuth, requireRole("admin"), userController.users_all)
router.put('/edit-user/:id', requireAuth, requireRole("admin"), userController.user_edit)
router.delete('/delete-user/:id', requireAuth, requireRole("admin"), userController.user_delete)
router.post('/check-email', userController.check_email)

module.exports = router;
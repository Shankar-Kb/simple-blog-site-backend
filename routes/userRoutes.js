const { Router } = require('express');
const userController = require('../controllers/userController');
const { checkUser } = require('../middleware/authMiddleware');

const router = Router();

router.post('/signup', userController.signup_post);
router.post('/login', userController.login_post);
router.get('/logout', userController.logout_get);
router.get('/login-check', checkUser);


module.exports = router;
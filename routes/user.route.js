const { Router } = require('express');
const { usersController } = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.get('/profile', authMiddleware, usersController.getMyProfile);
router.post('/liked/:id', authMiddleware, usersController.likedPhotos);
router.post('/subscribe/:id', authMiddleware, usersController.subscribeUser);
router.patch('/profile', authMiddleware, usersController.likedPhotos);
router.get('/', usersController.getUsers);
router.get('/:userId', usersController.getUser);

module.exports = router;

const { Router } = require('express');
const { photosController } = require('../controllers/photos.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.get('/', photosController.getAllPhotos);
router.get('/:authorId', photosController.getByAuthor);
router.post('/', authMiddleware, photosController.addPhoto);
router.patch('/:photoId', authMiddleware, photosController.editPhoto);
router.delete('/:photoId', authMiddleware, photosController.removePhoto);

module.exports = router;

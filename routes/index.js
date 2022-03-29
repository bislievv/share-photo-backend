const { Router } = require('express');

const router = Router();

router.use('/photos', require('./photos.route'));
router.use('/auth', require('./auth.route'));
router.use('/users', require('./user.route'));

module.exports = router;

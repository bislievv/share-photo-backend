const { Router } = require('express');
const { usersController } = require('../controllers/users.controller');

const router = Router();

router.post('/', usersController.postUser);
router.post('/login', usersController.login);

module.exports = router;

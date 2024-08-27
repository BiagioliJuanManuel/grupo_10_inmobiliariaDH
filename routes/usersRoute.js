const express = require('express');
const usersController = require('../controllers/usersController');
const upload = require('../services/uploadService');
const router = express.Router();

router.get('/favorito', usersController.favorito);
router.get('/login', usersController.login);
router.get('/registro', usersController.registro);
router.post('/registro', upload.single('image'), usersController.registroProcess);
router.get('/administracion', usersController.administracion);

module.exports = router;
const express = require('express');
const indexController = require('../controllers/indexController');
const router = express.Router();


router.get('/', indexController.index);
router.get('/detalle', indexController.detalle);
// router.get('/favorito', indexController.favorito);
// router.get('/login', indexController.login);
// router.get('/registro', indexController.registro);
// router.get('/administracion', indexController.administracion);

module.exports = router;
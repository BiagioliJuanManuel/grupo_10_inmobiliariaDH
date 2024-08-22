const express = require('express');
const indexController = require('../controllers/indexController');
const upload = require('../services/uploadService');
const router = express.Router();


router.get('/', indexController.index);
router.get('/propiedades', indexController.listado);
router.get('/detalle/:id', indexController.detalle);
router.get('/detalle/:id/edit', indexController.editar);
router.put('/detalle/:id', upload.any('images') ,indexController.actualizar);
router.delete('/borrar/:id', /* Middleware de auth */ indexController.borrar);
router.get('/crear', indexController.crearGet);
router.post('/crear', upload.single('images'), indexController.crearPost);


module.exports = router;
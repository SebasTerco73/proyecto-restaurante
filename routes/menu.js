const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Faltan agregar las rutas especificas para que sean llamados los metodos.

// GET
router.get('/', userController.obtenerTodasLasComidas);
router.get('/', userController.obtenerComidaPorNombre);
router.get('/', userController.obtenerTodasLasBebidas);
router.get('/', userController.obtenerBebidaPorNombre);

// POST
router.post('/', userController.crearUsuario);
router.post('/', userController.crearComida);
router.post('/', userController.crearBebida);

// PUT
router.post('/', userController.editarUsuario);
router.post('/', userController.editarComida);
router.post('/', userController.editarBebida);

// DELETE
router.delete('/:id', userController.eliminarUsuario);
router.delete('/:id', userController.eliminarComida);
router.delete('/:id', userController.eliminarBebida);


module.exports = router;
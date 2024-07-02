const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Faltan agregar las rutas especificas para que sean llamados los metodos.

// GET
router.get('/comidas', userController.obtenerTodasLasComidas);
router.get('/comidas/:id', userController.obtenerComidaPorID);
router.get('/bebidas', userController.obtenerTodasLasBebidas);
router.get('/bebidas/:id', userController.obtenerBebidaPorID);

// POST
router.post('/crear/usuario', userController.crearUsuario);
router.post('/crear/comida', userController.crearComida);
router.post('/crear/bebida', userController.crearBebida);

// PUT
router.post('/editar/usuario/:id', userController.editarUsuario);
router.post('/editar/comida/:id', userController.editarComida);
router.post('/editar/bebida/:id', userController.editarBebida);

// DELETE
router.delete('/eliminar/usuario/:id', userController.eliminarUsuario);
router.delete('/eliminar/comida/:id', userController.eliminarComida);
router.delete('/eliminar/bebida/:id', userController.eliminarBebida);


module.exports = router;
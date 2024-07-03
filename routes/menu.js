const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// GET
router.get('/comidas', userController.obtenerTodasLasComidas);
router.get('/comidas/:id', userController.obtenerComidaPorID);
router.get('/bebidas', userController.obtenerTodasLasBebidas);
router.get('/bebidas/:id', userController.obtenerBebidaPorID);

// POST
router.post('/crear/comida', userController.crearComida);
router.post('/crear/bebida', userController.crearBebida);

// PUT
router.put('/editar/comida/:id', userController.editarComida);
router.put('/editar/bebida/:id', userController.editarBebida);

// DELETE
router.delete('/eliminar/comida/:id', userController.eliminarComida);
router.delete('/eliminar/bebida/:id', userController.eliminarBebida);


module.exports = router;